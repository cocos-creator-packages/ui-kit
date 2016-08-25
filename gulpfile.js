'use strict';

const Del = require('del');

const gulp = require('gulp');
const sequence = require('gulp-sequence').use(gulp);

// general

// ==============================
// paths
// ==============================

let dest = './bin';
// let ignores = [
//   '!bin/**',
//   '!bower_components/**',
//   '!node_modules/**',
//   '!docs/**'
// ];
// // let allfiles = [Path.join('**/*')].concat(ignores);

// let paths = {
//   js: ['**/*.js', '!**/gulpfile.js'].concat(ignores),
//   html: ['**/*.html'].concat(ignores),
//   css: ['**/*.css'].concat(ignores),
//   less: ['**/*.less'].concat(ignores),
//   json: ['**/*.json', '!package.json'].concat(ignores),
//   image: ['**/*.{png,jpg}'].concat(ignores),
//   pkgJson: 'package.json',
// };
// let extnameMappings = {
//   '.less': '.css',
// };

// ==============================
// tasks
// ==============================

// js
gulp.task('js', function () {
  // if ( useBabel ) {
  //   var babel = require('gulp-babel');

  //   return gulp.src(paths.js)
  //     .pipe(babel())
  //     .pipe(gulp.dest(dest));
  // }

  return gulp.src('src/**/*.js')
    .pipe(gulp.dest(dest));
});

// html
gulp.task('html', function () {
  return gulp.src('src/**/*.html')
    .pipe(gulp.dest(dest));
});

// css
gulp.task('css', function () {
  return gulp.src('src/**/*.css')
    .pipe(gulp.dest(dest));
});

// less
gulp.task('less', function () {
  var less = require('gulp-less');

  return gulp.src('src/**/*.less')
    .pipe(less())
    .pipe(gulp.dest(dest));
});

// json
gulp.task('json', function () {
  return gulp.src('src/**/*.json')
    .pipe(gulp.dest(dest));
});

// images
gulp.task('image', function () {
  return gulp.src('src/**/*.{png,jpg}')
    .pipe(gulp.dest(dest));
});

// clean
gulp.task('clean', function (cb) {
  Del.sync(dest);
  cb();
});

// build
gulp.task('build', sequence(
  'clean',
  'js',
  'html',
  [ 'css', 'less' ],
  'json',
  'image'
));
