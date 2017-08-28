const gulp = require('gulp');
const gutil = require('gulp-util');
const sass = require('gulp-sass');
const connect = require('gulp-connect');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');
const del = require('del');

var jsDir = 'scripts/';
var sassDir = 'styles/';
var htmlDir = 'html/';
var outputDir = 'target/';

var jsSources = jsDir + "**/*.js";
var sassSources = sassDir + "**/*.scss";
var htmlSources = htmlDir + "**/*.html";

gulp.task('clean', function(){
     return del(outputDir + '**', {force:true});
});

gulp.task('html', function() {
  del([outputDir + "**/*.html"], {force:true});
  gulp.src(htmlSources)
  .pipe(gulp.dest(outputDir))
  .pipe(connect.reload());
});

gulp.task('sass', function() {
  del([outputDir + "**/*.css"], {force:true});
  gulp.src(sassSources)
  .pipe(sass({style: 'expanded'}))
    .on('error', gutil.log)
  .pipe(concat('main.css'))
  .pipe(gulp.dest(outputDir + sassDir))
  .pipe(connect.reload())
});

gulp.task('js', function() {
  del([outputDir + "**/*.js"], {force:true});
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