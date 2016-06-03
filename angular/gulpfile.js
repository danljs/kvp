var gulp = require('gulp'),
    del = require('del'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    notify = require("gulp-notify"),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    $ = require('gulp-load-plugins')(),
    gulpSync = $.sync(gulp);

gulp.task('build', function() {
  gulp.start('scripts');
  gulp.start('css');
});

gulp.task('templates', function() {
  gulp.src('app/templates/**/*.html')
    .pipe($.htmlmin({collapseWhitespace: true}))
    .pipe($.ngHtml2js({moduleName: 'app',prefix: 'templates/'}))
    .pipe(gulp.dest('.tmp/templates'));
});

gulp.task('html', gulpSync.sync(['templates', ['scripts', 'images']]), function () {
  gulp.src('app/index.html')
    .pipe($.inject(gulp.src('.tmp/templates/*.js', {read: false}), {
      starttag: '<!-- inject:templates -->',
      addRootSlash: false,
      addPrefix: '../'
    }))
    .pipe($.useref('.tmp,app'))
    .pipe($.if('*.js', $.ngAnnotate()))
    .pipe($.if('*.js', $.uglify()))
    .pipe($.if('*.css', $.cleanCss()))
    .pipe(gulp.dest('dist'));
});

gulp.task('clean', function () { del(['.tmp', 'dist'])});

gulp.task('images', function () {
  // gulp.src('app/assets/img/**/*')
  //   .pipe(gulp.dest('dist/assets/img')));
});

gulp.task('watch', function() {
  gulp.watch(['index.js'], function() {
    gulp.start('scripts');
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
    .pipe(gulp.dest('dist'))
    .pipe(notify({ message: 'Styles task complete' }));
});

gulp.task('scripts', function() {
  var scripts = [
    'app/index.js'
  ];

  gulp.src(scripts)
    .pipe(concat('app.js'))
    // .pipe(uglify())
    .pipe(gulp.dest('dist'));
});