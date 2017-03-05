var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    less = require('gulp-less'),
    cleanCss = require('gulp-clean-css'),
    imageOp = require('gulp-image-optimization'),
    gutil = require('gulp-util'),
    livereload = require('gulp-livereload');

gulp.task('default', ['styles', 'watch']);
// gulp.task('default', ['scripts', 'styles', 'images', 'watch']);

gulp.task('watch', function() {
	livereload.listen();
  // gulp.watch([
  //  	'js/*js'
  // ], ['scripts']);
  gulp.watch([
  	'css/style.less'
  ], ['styles']);
  // gulp.watch([
  // 	'images/*'
  // ], ['images']);
});

// gulp.task('scripts', function() {
//   gulp.src([
//     'js/*js'
//     ])
//   .pipe(uglify().on('error', gutil.log))
//   .pipe(gulp.dest('minify'))
//   .pipe(livereload());
// });

gulp.task('styles', function() {
	return gulp.src('css/style.less')
		.pipe(less().on('error', gutil.log))
		.pipe(cleanCss())
	  .pipe(gulp.dest('css'))
	  .pipe(livereload());
});

// gulp.task('images', function(cb) {
//   gulp.src(['public/stylesheets/images/*']).pipe(imageOp({
//     optimizationLevel: 5,
//     progressive: true,
//     interlaced: true
//   }))
//   .pipe(gulp.dest('minify'))
//   .pipe(livereload())
//   .on('end', cb)
//   .on('error', cb);
// });

/***
Note:
- 不主動偵測改變的元件less變更，除非source檔案引用才會重新compile less file
- 更新less後無法做livereload
***/