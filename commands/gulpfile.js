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

var output = '../dist',
    input = '../web/assets/scss/**/*.scss',
    autoprefixerOptions = { browsers: ['last 2 versions', '> 5%', 'ie >= 9', 'Firefox ESR'] };



// JS paths
var jsSource = [
      '../web/application.js', 
      '../../base-member-web/js/**/*.js', 
      '../web/master.js', 
      '../web/home.js', 
      '../web/services/*.js', 
      '../web/factories/*.js', 
      '../web/components/**/*.js', 
      '../web/directives/*.js',

      // exclude all tests
      '!../web/**/*test.js'
    ],
    jsDist = '../dist';

/* clean dist */
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
    return gulp.src(jsSource)
          .pipe(sourcemaps.init())
          .pipe(concat('master.js'))
          .pipe(rename('master.min.js'))
          .pipe(uglify())
          .pipe(sourcemaps.write('.'))
          .pipe(gulp.dest(jsDist));
  });
});

// -----------------------------------------------------------------------------
// Sass compilation
// -----------------------------------------------------------------------------
gulp.task('sass', function () {
  runSequence('clean-css', function() {
    return gulp
      .src(input)
      .pipe(sourcemaps.init())
      .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
      .pipe(autoprefixer(autoprefixerOptions))
      .pipe(sourcemaps.write('.'))
      .pipe(gulp.dest(output));
  });
});


// -----------------------------------------------------------------------------
// SVG Sprites
// -----------------------------------------------------------------------------

gulp.task('sprites', function () {
  return gulp.src('/web/assets/images/icons/*.svg')
  .pipe(svgSprite({
    mode: {
      symbol: {
        inline: true,
        dest: "images",
        sprite: "icons",
        prefix: ".icon-%s",
        example: {
          template: "../web/assets/images/icons-section-template.html",
          dest: "icons-section.html"
        }
      }
    }
  }))
  .pipe(gulp.dest("../"));
});


// -----------------------------------------------------------------------------
// Watchers
// -----------------------------------------------------------------------------

gulp.task('watch', function() {
  gulp.watch(input, ['sass'])
    .on('change', function(event) {
      console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
    });
  gulp.watch('/web/assets/images/icons/*.svg', ['sprites'])
    .on('change', function(event) {
      console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
    });
  gulp.watch(jsSource, ['scripts'])
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

//gulp.task('build', ['sass', 'sprites', 'scripts']);

/* $ /path/to/gulpfile/gulp */
/* used for local dev */
gulp.task('default', function(callback) {
  runSequence('clean', ['sass', 'sprites', 'scripts', 'watch'], callback);    
});

/* $ /path/to/gulpfile/gulp build */
/* used for one time builds (environments other than local dev) */
gulp.task('build', function(callback) {
  runSequence('clean', ['sass', 'sprites', 'scripts'], callback);    
});

gulp.task('build-test', function(callback) {
  runSequence('clean', ['sass', 'sprites', 'scripts'], 'test', callback); 
});