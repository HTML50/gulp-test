'use strict';

var gulp = require('gulp'),
    less = require('gulp-less'),
    cleanCSS = require('gulp-clean-css'),
    pug = require('gulp-pug'),
    htmlmin = require('gulp-htmlmin'),
    coffee = require('gulp-coffee'),
    uglify = require('gulp-uglify'),
    plumber = require('gulp-plumber');
    

gulp.task('pug', function buildHTML() {
  return gulp.src('src/pug/*.pug')
  .pipe(plumber())
  .pipe(pug({
        pretty:true
    }))
  .pipe(htmlmin({collapseWhitespace: true}))
  .pipe(gulp.dest('dist/'));
});


gulp.task('less', function () {
    return gulp.src('./src/less/*.less')
    .pipe(plumber())
    .pipe(less())
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest('./dist/css'))
});

gulp.task('coffee', function() {
    return gulp.src('./src/coffee/*.coffee')
    .pipe(plumber())
    .pipe(coffee({bare: true}))
    .pipe(uglify())
    .pipe(gulp.dest('./dist/js'));
});

gulp.task('default', function () {
    gulp.watch('src/coffee/*.coffee',['coffee']);
    gulp.watch('src/less/*.less', ['less']);
    gulp.watch('src/pug/*.pug', ['pug']);
});