'use strict';

var path = require('path');
var gulp = require('gulp');
var conf = require('./conf');
var babel = require('gulp-babel');
var template = require('gulp-template');

var browserSync = require('browser-sync');

var $ = require('gulp-load-plugins')();


gulp.task('scripts-reload', function() {
  return buildScripts()
    .pipe(browserSync.stream());
});

gulp.task('scripts', ['environment'], function() {
  return buildScripts();
});

gulp.task('environment',
  function() {
    var apiUrl = 'http://localhost:7777/api/';
    var envFile = path.join(conf.paths.src, '/app');
    return gulp.src('env.js')
      .pipe(template({"apiUrl": apiUrl}))
      .pipe(gulp.dest(envFile, {overwrite: false}));
  }
);

function buildScripts() {
  return gulp.src(
      [
        path.join(conf.paths.src, '/app/**/*.js'),
        path.join(conf.paths.src, '/lib/**/*.js')
      ]
    )
    .pipe($.eslint())
    .pipe($.eslint.format())
    .pipe(babel({
      presets: ['env']
    }))
    .pipe($.size())
}
