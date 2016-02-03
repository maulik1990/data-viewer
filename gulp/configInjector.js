'use strict';

var path = require('path');
var $ = require('gulp-load-plugins')();
var gulp = require('gulp');
var conf = require('./conf');
var pkg = require('../package.json');

function injectConfigTask (env) {
  var now = new Date().toGMTString(),
    buildKey = pkg.version;

  //if running on bamboo
  if(process.env['bamboo_buildResultKey']) {
    buildKey = process.env['bamboo_buildResultKey'];
  }

  return gulp.src([path.join(conf.paths.generated, 'config.module.js')])
    .pipe(replace('VERSION', 'N/A', buildKey))
    .pipe(replace('BUILD_DATE', 'N/A', now))
    .pipe(replace('API_END_POINT', '.', pkg.config.API_END_POINTS[env]))
    .pipe(gulp.dest(path.join(conf.paths.tmp, '/serve/generated')));
}

function replace(key, oldValue, newValue) {
  return $.replace(
    "'" + key + "':'" + oldValue + "'",
    "'" + key + "':'" + newValue + "'"
  );
}

gulp.task('configInjector', function () {
  return injectConfigTask('local');
});

gulp.task('configInjector:test', function () {
  return injectConfigTask('test');
});

gulp.task('configInjector:prod', function () {
  return injectConfigTask('prod');
});
