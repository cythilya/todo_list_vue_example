var gulp = require('gulp');
var less = require('gulp-less');
var cleanCss = require('gulp-clean-css');
var gutil = require('gulp-util');
var livereload = require('gulp-livereload');

gulp.task('default', ['styles', 'watch']);

gulp.task('watch', function() {
	livereload.listen();
  gulp.watch(['css/style.less'], ['styles']);
});

gulp.task('styles', function() {
	return gulp.src('css/style.less')
		.pipe(less().on('error', gutil.log))
		.pipe(cleanCss())
	  .pipe(gulp.dest('css'))
	  .pipe(livereload());
});