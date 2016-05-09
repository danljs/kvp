var gulp = require('gulp');
var source = require('vinyl-source-stream');
var browserify = require('browserify');
var babelify = require('babelify');
var less = require('gulp-less');
var plumber = require('gulp-plumber');

gulp.task('build', function() {
  gulp.start('js');
  gulp.start('css');
});

gulp.task('watch', function() {
  gulp.watch(['*.jsx','index.js'], function() {
    gulp.start('js');
  });

  gulp.watch(['../less/*'], function() {
    gulp.start('css');
  });
});

gulp.task('js', function() {
  browserify({entries: 'index.js', extensions: ['.jsx','.js']})
  .transform(babelify.configure({stage: 0}))
  .bundle()
  .pipe(source('app.js'))
  .pipe(gulp.dest('.'));
});

gulp.task('css', function() {
  return gulp.src('../less/app.less')
    .pipe(less())
    .pipe(plumber())
    .pipe(gulp.dest('.'));
});