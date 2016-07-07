'use strict';


// -----------------------------------------------------------------------------
// Dependencies
// -----------------------------------------------------------------------------

var gulp = require('gulp'),
    sass = require('gulp-sass'),
    svgSprite = require('gulp-svg-sprite'),
    sourcemaps = require('gulp-sourcemaps'),
    autoprefixer = require('gulp-autoprefixer'),
    concat = require('gulp-concat'),
    rename = require('gulp-rename'),
    clean = require('gulp-clean'),
    runSequence = require('run-sequence'),
    uglify = require('gulp-uglify'),
    Server = require('karma').Server;


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
          .pipe(gulp.dest(output));
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
      .pipe(gulp.dest(output));
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

// -----------------------------------------------------------------------------
// Default task
// -----------------------------------------------------------------------------

/* $ /path/to/gulpfile/gulp */
/* used for local dev */
gulp.task('default', function(callback) {
  runSequence('clean', ['sass', 'scripts', 'watch'], callback);    
});

/* $ /path/to/gulpfile/gulp build */
/* used for one time builds (environments other than local dev) */
gulp.task('build', function(callback) {
  runSequence('clean', ['sass', 'scripts'], callback);    
});

gulp.task('build-test', function(callback) {
  runSequence('clean', ['sass', 'scripts'], 'test', callback); 
});