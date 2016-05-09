var gulp = require('gulp');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var notify = require("gulp-notify");
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');

gulp.task('build', function() {
  gulp.start('js');
  gulp.start('css');
});

gulp.task('watch', function() {
  gulp.watch(['index.js'], function() {
    gulp.start('js');
  });

  gulp.watch(['../sass/*'], function() {
    gulp.start('css');
  });
});

gulp.task('css', function() {
  gulp
    .src('../sass/app.scss')
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', function(err){notify({ message: 'Error' });}))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('.'))
    .pipe(notify({ message: 'Styles task complete' }));
});

gulp.task('js', function() {
  var scripts = [
    'index.js'
  ];

  gulp.src(scripts)
    .pipe(concat('app.js'))
    // .pipe(uglify())
    .pipe(gulp.dest('.'));
});