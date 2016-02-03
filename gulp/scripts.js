'use strict';

var path = require('path');
var gulp = require('gulp');
var conf = require('./conf');

var browserSync = require('browser-sync');

var $ = require('gulp-load-plugins')();

function scriptsTask () {
  return gulp.src([
    path.join(conf.paths.src, '/**/*.js'),
    path.join(conf.paths.tmp, '/serve/generated/*.js')
  ])
    .pipe($.jshint())
    .pipe($.jshint.reporter('jshint-stylish'))
    .pipe(browserSync.reload({stream: true}))
    .pipe($.size());
}

gulp.task('scripts', ['configInjector'], scriptsTask);
gulp.task('scripts:test', ['configInjector:test'], scriptsTask);
gulp.task('scripts:prod', ['configInjector:prod'], scriptsTask);
