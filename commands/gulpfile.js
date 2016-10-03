'use strict';


// -----------------------------------------------------------------------------
// Dependencies
// -----------------------------------------------------------------------------

var gulp = require('gulp'),
    gulpDocs = require('gulp-ngdocs'),
    sass = require('gulp-sass'),
    svgSprite = require('gulp-svg-sprite'),
    sourcemaps = require('gulp-sourcemaps'),
    autoprefixer = require('gulp-autoprefixer'),
    concat = require('gulp-concat'),
    rename = require('gulp-rename'),
    clean = require('gulp-clean'),
    runSequence = require('run-sequence'),
    uglify = require('gulp-uglify'),
    Server = require('karma').Server,
    pjson = require('./package.json');


// -----------------------------------------------------------------------------
// Configuration
// -----------------------------------------------------------------------------

// Dist location
var output = '../dist';

// Style paths & config
var styleSource = '../web/assets/scss/**/*.scss',
    autoprefixerOptions = { browsers: ['last 2 versions', '> 5%', 'ie >= 9', 'Firefox ESR'] };

// Script paths & config
var scriptSource = [
      '../web/application.js',
      '../web/services/**/*.js',
      '../web/factories/**/*.js',
      '../web/components/**/*.js',
      '../web/directives/**/*.js',

      // exclude all tests
      '!../web/**/*test.js'
    ];

var imagesSource = '../web/assets/images/*';

/* Clean Dist */
/* Useful for cleaning up files that may have been removed and would cause conflicts */
gulp.task('clean', function () {
    return gulp.src(output, {read: false})
        .pipe(clean({force: true}));
});

gulp.task('clean-css', function () {
    return gulp.src(output + '/*.css*', {read: false})
        .pipe(clean({force: true}));
});
gulp.task('clean-scripts', function () {
    return gulp.src(output + '/*.js*', {read: false})
        .pipe(clean({force: true}));
});


gulp.task('copy', ['copy-images']);
// copy images from src to dist
gulp.task('copy-images', function() {
  return gulp.src(imagesSource)
        .pipe(gulp.dest(output + '/images'));
});

// -----------------------------------------------------------------------------
// JS concat & minify
// -----------------------------------------------------------------------------
gulp.task('scripts', function() {
  runSequence('clean-scripts', function() {
    return gulp.src(scriptSource)
          .pipe(sourcemaps.init())
          .pipe(concat('master.js'))
          .pipe(rename('master.min.js'))
          .pipe(uglify())
          .pipe(sourcemaps.write('.'))
          .pipe(gulp.dest(output + '/js'));
  });
});

// -----------------------------------------------------------------------------
// Sass compilation
// -----------------------------------------------------------------------------
gulp.task('sass', function () {
  runSequence('clean-css', function() {
    return gulp
      .src(styleSource)
      .pipe(sourcemaps.init())
      .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
      .pipe(autoprefixer(autoprefixerOptions))
      .pipe(rename('master.min.css'))
      .pipe(sourcemaps.write('.'))
      .pipe(gulp.dest(output + '/css'));
  });
});

// -----------------------------------------------------------------------------
// Watchers
// -----------------------------------------------------------------------------

gulp.task('watch', function() {
  gulp.watch(styleSource, ['sass'])
    .on('change', function(event) {
      console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
    });
  gulp.watch(scriptSource, ['scripts'])
    .on('change', function(event) {
      console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
    });
});


// runs watch on all source (css, js, etc) and runs karma test watcher (runs tests and build on every file change)
gulp.task('watch-test', function() {
  runSequence('build', 'watch', 'test-watch');
});


// ----
// tests
// ----
/* runs karma/jasmine tests one time */
gulp.task('test', function(done) {
    new Server({
        configFile: __dirname + '/karma.conf.js',
        singleRun: true
    }, done).start();
});
/* runs karma/jasmine tests continuously on file changes */
gulp.task('test-watch', function(done) {
    new Server({
        configFile: __dirname + '/karma.conf.js'
    }, done).start();
});

/**
 * This is a collection of files to
 * be added to the ng-docs task.
 * these should only be angular-related files
 * that hve been updated with the ngdoc style comments.
 */
var ngDocSource = [
    '../web/application.js',
    '../web/components/**/*.js',
    '../web/directives/**/*.js',
    '../web/services/**/*.js'
];

/**
 * Including supporting scripts here like
 * jQuery
 * third party js
 * etc
 */
var dependentScripts = [
    '../web/application.js',
    '../web/components/example/ExampleController.js',
    '../web/components/home/HomeController.js',
    '../web/directives/example-directive.js',
];

/**
 * ng-docs
 * This task reads ng-doc formatted comments
 * and automatically generates the appropriate
 * pages and content for the included angular js files.
 *
 * Documentation Guide
 * https://github.com/angular/angular.js/wiki/Writing-AngularJS-Documentation
 * https://github.com/idanush/ngdocs/wiki/API-Docs-Syntax
 * http://www.podpea.co.uk/blog/starting-off-with-ngdocs/
 */
gulp.task('ngdocs', [], function () {
  var options = {
    scripts: dependentScripts,
    html5Mode: false,
    startPage: '/api',
    title: pjson.description//,
    // TODO: Brand and style this for a better experience
    // image: "http://1h3ci31pyjih49uge04f79s6.wpengine.netdna-cdn.com/wp-content/themes/razrhq/assets/i/logo-razrhq.svg",
    // imageLink: "http://razrhq.com/",
    // titleLink: "http://razrhq.com/"
  }
  return gulp.src(ngDocSource)
    .pipe(gulpDocs.process(options))
    .pipe(gulp.dest('./docs'));
});

// -----------------------------------------------------------------------------
// Default task
// -----------------------------------------------------------------------------

/* $ /path/to/gulpfile/gulp */
/* used for local dev */
gulp.task('default', function(callback) {
  runSequence('clean', ['sass', 'scripts', 'copy', 'watch', 'ngdocs'], callback);
});

/* $ /path/to/gulpfile/gulp build */
/* used for one time builds (environments other than local dev) */
gulp.task('build', function(callback) {
  runSequence('clean', ['sass', 'scripts', 'copy'], callback);
});

gulp.task('build-test', function(callback) {
  runSequence('clean', ['sass', 'scripts', 'copy'], 'test', callback);
});
