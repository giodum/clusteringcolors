/*************************************************************************
   This gulpfile uses gulp-environments for env recognition. By deafult
   it checks the NODE_ENV variable to determinate the right environment,
   but it is possible to force it adding a parameter in the command line:

   gulp --env development
   gulp --env production
**************************************************************************/

/****************/
/* GULP REQUIRE */
/****************/
var gulp = require('gulp');

/****************/
/* GULP PLUGINS */
/****************/
var autoprefix = require('gulp-autoprefixer');
var browserify = require('gulp-browserify');
var clean = require('gulp-clean-dest');
var concat = require('gulp-concat');
var imagemin = require('gulp-imagemin');
var rename = require("gulp-rename");
var sass = require('gulp-sass');
var sassBulk = require('gulp-sass-bulk-import');
var sourcemaps = require('gulp-sourcemaps');
var stripDebug = require('gulp-strip-debug');
var uglify = require('gulp-uglify');

/******************/
/* PATH VARIABLES */
/******************/

var cssDestination = "dist/css/";
var cssOrigin = "src/sass/";
var jsDestination = "dist/js/";
var jsOrigin = "src/js/";

/*****************/
/* GENERAL TASKS */
/*****************/

gulp.task('sass', function() {
  gulp.src(cssOrigin + 'master.scss')
  .pipe(clean(cssDestination))
  .pipe(sassBulk())
  .pipe(sourcemaps.init())
  .pipe(sass().on('error', sass.logError))
  .pipe(autoprefix('last 5 versions'))
  .pipe(sourcemaps.write('./maps'))
  .pipe(gulp.dest(cssDestination))
});

gulp.task('scripts', function() {
  gulp.src([jsOrigin + '**/*.js'])
  .pipe(browserify({
          insertGlobals : true
        }))
  .pipe(clean(jsDestination))
  .pipe(sourcemaps.init())
  .pipe(concat('main.js'))
  .pipe(rename({suffix: '.min' }))
  .pipe(sourcemaps.write('maps'))
  .pipe(gulp.dest(jsDestination));
});

gulp.task('watch', function() {
  gulp.watch(cssOrigin + '**/*.scss', ['sass']);
  gulp.watch(jsOrigin + '**/*.js', ['scripts']);
});

gulp.task('default', ['sass', 'scripts']);
