var gulp = require('gulp');
var less = require('gulp-less');
var minifyCSS = require('gulp-minify-css');
var webpack = require('webpack-stream');

gulp.task('build-less', function () {
    return gulp.src('./less/site.less')
        .pipe(less())
        .pipe(minifyCSS())
        .pipe(gulp.dest('./css/'));
});

gulp.task('watch-css', function () {
    gulp.watch('./less/*.less', ['build-less']);
});
