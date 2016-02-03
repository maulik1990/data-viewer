'use strict';

var path = require('path');
var gulp = require('gulp');
var conf = require('./conf');

var $ = require('gulp-load-plugins')();

var wiredep = require('wiredep').stream;
var _ = require('lodash');

function injectTask () {
  var injectStyles = gulp.src([
    path.join(conf.paths.tmp, '/serve/app/**/*.css'),
    path.join('!' + conf.paths.tmp, '/serve/app/vendor.css')
  ], {read: false});

  var pluginScripts = gulp.src([
    path.join(conf.paths.src, '/_assets/plugins/**/*.js')
  ], {read: false});

  var pluginScriptsOptions = {
    ignorePath: [conf.paths.src],
    addRootSlash: false,
    starttag: '<!-- inject:plugin:{{ext}} -->'
  };

  var injectScripts = gulp.src([
    path.join(conf.paths.src, '/**/*.module.js'),
    path.join(conf.paths.src, '/**/*.js'),
    path.join(conf.paths.tmp, '/serve/generated/*.js'),
    path.join('!' + conf.paths.src, '/**/*.spec.js'),
    path.join('!' + conf.paths.src, '/**/*.mock.js'),
    path.join('!' + conf.paths.src, '/_assets/plugins/**/*.js')
  ])
    .pipe($.angularFilesort()).on('error', conf.errorHandler('AngularFilesort'));

  var injectOptions = {
    ignorePath: [conf.paths.src, path.join(conf.paths.tmp, '/serve')],
    addRootSlash: false
  };

  return gulp.src(path.join(conf.paths.src, '/*.html'))
    .pipe($.inject(injectStyles, injectOptions))
    .pipe($.inject(pluginScripts, pluginScriptsOptions))
    .pipe($.inject(injectScripts, injectOptions))
    .pipe(wiredep(_.extend({}, conf.wiredep)))
    .pipe(gulp.dest(path.join(conf.paths.tmp, '/serve')));
}

gulp.task('inject', ['scripts', 'styles'], injectTask);
gulp.task('inject:test', ['scripts:test', 'styles'], injectTask);
gulp.task('inject:prod', ['scripts:prod', 'styles'], injectTask);
