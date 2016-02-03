'use strict';

var path = require('path');
var gulp = require('gulp');
var conf = require('./conf');
var debug = require('gulp-debug');

var browserSync = require('browser-sync');

var $ = require('gulp-load-plugins')();

var wiredep = require('wiredep').stream;
var _ = require('lodash');

gulp.task('styles', function () {
  var sassOptions = {
    outputStyle: 'compressed'
  };

  var injectFiles = gulp.src([
    path.join(conf.paths.src, '/_assets/stylesheets/**/*.scss'),
    path.join('!' + conf.paths.src, '/_assets/stylesheets/index.scss')
  ], { read: false });

  var injectOptions = {
    transform: function(filePath) {
      filePath = filePath.replace(conf.paths.src + '/_assets/stylesheets/', '');
      //do not import .scss file starting with _
      if (path.basename(filePath).indexOf('_') === 0) {
        return '';
      }
      return '@import "' + filePath + '";';
    },
    starttag: '// injector',
    endtag: '// endinjector',
    addRootSlash: false
  };

  var cssFilter = $.filter('**/*.css', {restore: true});

  return gulp.src([
    path.join(conf.paths.src, '/_assets/stylesheets/index.scss')
  ])
    .pipe($.inject(injectFiles, injectOptions))
    .pipe(wiredep(_.extend({}, conf.wiredep)))
    .pipe($.sass(sassOptions)).on('error', conf.errorHandler('Sass'))
    .pipe(cssFilter)
    .pipe($.sourcemaps.init({ loadMaps: true }))
    .pipe($.autoprefixer()).on('error', conf.errorHandler('Autoprefixer'))
    .pipe($.sourcemaps.write())
    .pipe(cssFilter.restore)
    .pipe(gulp.dest(path.join(conf.paths.tmp, '/serve/app/')))
    .pipe(browserSync.reload({ stream: true }));
});
