/**
 * Master Gulpfile
 * Builds the application and generates required source
 *
 * Instructions
 * -------------------------
 * run the following commands
 *   `npm install`
 *   `gulp` (to build)
 *   `gulp nuke` (to clean project back to its default state)
 */
var gulp = require('gulp'),
    gulpDocs = require('gulp-ngdocs'),
    access = require('gulp-accessibility'),
    clean = require('gulp-clean'),
    sass = require('gulp-sass'),
    jshint = require('gulp-jshint'),
    autoprefixer = require('gulp-autoprefixer'),
    concat = require('gulp-concat'),
    print = require('gulp-print'),
    rename = require('gulp-rename'),
    uglify = require('gulp-uglify'),
    gulpDocs = require('gulp-ngdocs'),
    pjson = require('./package.json'),
    shell = require('gulp-shell'),
    sassLint = require('gulp-sass-lint'),
    mergeStream = require('merge-stream'),
    server = require('gulp-server-livereload'),
    templateCache = require('gulp-angular-templatecache'),
    Server = require('karma').Server;

// --------- Paths anc collections used in the build process
var distBase = './razr-alpha',
    jsFiles = ['./modules/**/*.js'],
    jsWatchFiles = [],
    moduleBasePath = distBase + '/modules',
    autoprefixerOptions = { browsers: ['last 2 versions', '> 5%', 'ie >= 9', 'Firefox ESR'] },

    // list the readme files that will be concatenated into one file
    readMeSrc = [
        "DEV-README.md",
        "PJSON-README.md"
    ],
    // Paths that will be removed by the 'clean' task
    cleanPaths = [
        distBase + "/**/*.*",
        'css'
    ],
    // Paths that will be removed by the 'nuke' task
    nukePaths = [
        distBase,
        'node_modules'
    ],
    // Path(s) to the projects sass files
    sassSrc = ['modules/sass/**/*.scss'],
    //Css Destination path
    sassDest = distBase + '/modules/css',

    /**
     * The Modules object defines the widgets/modules that will
     * be built into the application.  Some are required, while
     * others can be ignored
     *
     * Reuired Modules:
     *----------------------------------------------------------
     * This is a collection of basic and shared modules required
     * for the application to properly function
     *  -example-module-application
     *  -example-common-module
     *
     * Optional Modules
     *----------------------------------------------------------
     * These modules are not required unless they are needed
     * commenting them out will exclude them from the build process.
     * -example-module
     *
     *
     */
    modules = [
        // ********************* Required *********************
        {
            nameBase : 'razr-alpha-app',
            srcPath : ['modules/razr-alpha.js', './node_modules/angular-ui-router/release/angular-ui-router.js'],
            distPath : distBase,
            partialsPath : 'modules/partials/*.html'
        },
        // ********************* Required *********************
        {
            nameBase : 'razr-alpha-templates',
            srcPath : ['modules/templates/templates.js'],
            distPath : distBase,
            partialsPath : 'modules/partials/*.html'
        },
        // ********************* Required *********************
        {
            nameBase : "common",
            srcPath : ['modules/common/**/*.js'],
            distPath : moduleBasePath,
            partialsPath : 'modules/common/partials/**/*.html'
        },
        // ********************* Optional *********************
        // Shopping Cart
        {
            nameBase : 'storefront-manager',
            srcPath : ['modules/storefront-manager/**/*.js'],
            distPath : moduleBasePath,
            partialsPath : 'modules/storefront-manager/partials/**/*.html'
        }
    ],
    uglifyOptions = {
        mangle:true
    };


// Nukes all generated source
gulp.task('nuke', function () {
    return gulp.src(nukePaths, {read: false})
        .pipe(clean({force: true}));
});

// Cleans the distribution folder
gulp.task('clean', function () {
    //return true;
    return gulp.src(cleanPaths, {read: false})
        .pipe(clean({force: true}));
});

// Validates the sass syntax
gulp.task('lint-sass', ['clean'], function () {
  return gulp.src(sassSrc)
    .pipe(sassLint());
});

// Compiles the sass
gulp.task('sass', ['lint-sass'], function () {
    return gulp.src(sassSrc)
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(autoprefixer(autoprefixerOptions))
        .pipe(gulp.dest(sassDest));
});

// Creates a single template js
gulp.task('markdown', ['sass'], function () {
  return gulp.src('modules/**/partials/*.html')
    .pipe(templateCache({
        module : "RazrAlpha",
        transformUrl: function(url) {
            var strings = url.split("/");
            lastString = strings[strings.length-1];
            return lastString;
        }
    }))
    .pipe(gulp.dest('./modules/templates'));
});

// Concat individual modules js into single js files
gulp.task('scripts', ['markdown'], function() {
    var length = modules.length;
    var tasks = [];
    for(var i = 0; i < length; i++) {
        var srcPath = modules[i].srcPath,
            nameBase = modules[i].nameBase,
            distPath = modules[i].distPath;
        tasks.push(
            gulp.src(srcPath)
                .pipe(concat(nameBase + ".concat.js"))
                .pipe(gulp.dest(distPath + "/" + nameBase))
        );
    }
    return mergeStream(tasks);
});

// Concats and minifies the distribution css
gulp.task('minify-dist', ['scripts'], function() {
    return gulp.src([distBase + '/**/*.js'])
        .pipe(concat('razr-alpha.js'))
        .pipe(gulp.dest(distBase))
        .pipe(rename('razr-alpha.min.js'))
        .pipe(uglify(uglifyOptions))
        .pipe(gulp.dest(distBase));
});

// Concat individual modules js into single js files
gulp.task('module-scripts', ['minify-dist'], function() {
    var length = modules.length;
    var tasks = [];
    for(var i = 0; i < length; i++) {
        var srcPath = modules[i].srcPath,
            nameBase = modules[i].nameBase,
            distPath = modules[i].distPath;
        tasks.push(
            gulp.src(srcPath)
                .pipe(uglify(uglifyOptions))
                .pipe(rename(nameBase + ".min.js"))
                .pipe(gulp.dest(distPath + "/" + nameBase))
        );
    }
    return mergeStream(tasks);
});

//Lints the css and checks for errors
gulp.task('lint', ['module-scripts'], function() {
    //return true;
    return gulp.src(jsFiles)
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

// Creates readme file from the package.json file.
gulp.task('generate-read-me', ['lint'], function () {
  return gulp.src('*.md', {read: false})
    .pipe(shell([
      'readme package.json > PJSON-README.md'
    ]));
});

// Concats the two Readme files into one, 'README.md' file
gulp.task('concat-read-me', ['generate-read-me'], function() {
    return gulp.src(readMeSrc)
        .pipe(concat("README.md"))
        .pipe(gulp.dest(""));
});

/**
 * This task reads ng-doc formatted comments
 * and automatically generates the appropriate
 * pages and content for the included angular js files.
 */
gulp.task('ng-docs', ['concat-read-me'], function () {
  var options = {
    //scripts: dependentScripts,
    html5Mode: false,
    startPage: '/api/application',
    title: pjson.name//,
    // TODO: Brand and style this for a better experience
    // image: "http://1h3ci31pyjih49uge04f79s6.wpengine.netdna-cdn.com/wp-content/themes/razrhq/assets/i/logo-razrhq.svg",
    // imageLink: "http://razrhq.com/",
    // titleLink: "http://razrhq.com/"
  };
  return gulp.src(jsFiles)
    .pipe(gulpDocs.process(options))
    .pipe(gulp.dest('./docs'));
});

function getDate() {
    var today = new Date(),
        hh = today.getHours(),
        min = today.getMinutes(),
        dd = today.getDate(),
        mm = today.getMonth(),
        yyyy = today.getFullYear();
    if(dd<10){
        dd='0'+dd;
    }
    if(mm<10){
        mm='0'+mm;
    }
    // Configures a one day (24 hour) granularity of reporting.
    today = '__date-' + dd + '_' + mm + '_' + yyyy;
    return today;
}

var htmlSource = [
    "modules/**/partials/*.html",
    "./index.html"
];

//Evaluate the markup and report on failures to comply.
gulp.task('wcag', function() {
    return gulp.src(htmlSource)
        .pipe(access({
            force: true,
            accessibilityLevel: 'WCAG2A',
            reportLevels: {
                notice: false,
                warning: true,
                error: true
            }
    }))
    .on('error', console.error)
    .pipe(access.report({
        reportType: 'json'
    }))
    .pipe(rename({
        extname: '.json'
    }))
    .pipe(gulp.dest('reports/json'));
});

// Watch task to watch and update the source on change
gulp.task('watch', function() {
    var watchFiles = jsWatchFiles.concat(sassSrc);
    gulp.watch(watchFiles, ['ng-docs']);
});

// the dev task will call this webserver task and open the app with live reload enabled
gulp.task('webserver', function() {
  return gulp.src('')
    .pipe(server({
      livereload: false,
      directoryListing: false,
      open: true,
      fallback : './index.html'
    }));
});

// default task for automated or production builds
gulp.task('default', ['ng-docs']);

gulp.task('dev', ['default']);

module.exports = gulp;


