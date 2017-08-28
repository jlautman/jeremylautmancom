var gulp = require('gulp'),
    gutil = require('gulp-util'),
    sass = require('gulp-sass'),
    connect = require('gulp-connect'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat');

var jsDir = 'scripts/';
var sassDir = 'styles/';
var htmlDir = 'html/';
var outputDir = 'target/';

var jsSources = jsDir + "**/*.js";
var sassSources = sassDir + "**/*.scss";
var htmlSources = htmlDir + "**/*.html";


gulp.task('html', function() {
  gulp.src(htmlSources)
  .pipe(gulp.dest(outputDir))
  .pipe(connect.reload());
});

gulp.task('sass', function() {
  gulp.src(sassSources)
  .pipe(sass({style: 'expanded'}))
    .on('error', gutil.log)
  .pipe(concat('main.css'))
  .pipe(gulp.dest(outputDir + sassDir))
  .pipe(connect.reload())
});

gulp.task('js', function() {
  gulp.src(jsSources)
  .pipe(uglify())
  .pipe(concat('main.js'))
  .pipe(gulp.dest(outputDir + jsDir))
  .pipe(connect.reload());
});

gulp.task('watch', function() {
  gulp.watch(jsSources, ['js']);
  gulp.watch(sassSources, ['sass']);
  gulp.watch(htmlSources, ['html']);
});

gulp.task('connect', function() {
  connect.server({
    root: 'target',
    livereload: true
  });
});

gulp.task('default', ['html', 'js', 'sass', 'connect', 'watch']);