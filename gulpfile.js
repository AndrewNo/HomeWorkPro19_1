var gulp = require('gulp');

// templates
/*var htmlmin = require('gulp-htmlmin');

gulp.task('templates', function(){
	gulp.src('./dev/!*.html')
		.pipe(htmlmin({
			collapseWhitespace: true
		}))
		.pipe(gulp.dest('./site'))
		.pipe(connect.reload());
});*/

var pug = require('gulp-pug');

gulp.task('templates', function() {
    gulp.src('./dev/pug/*.pug')
        .pipe(pug({}))
        .pipe(gulp.dest('./site'))
        .pipe(connect.reload());
});

gulp.task('copy', function () {
        return gulp.src(['./dev/fonts/**/*'])
          .pipe(gulp.dest('./site/fonts'))
		  .pipe(connect.reload());
    });

// styles
var cleanCSS = require('gulp-clean-css');
var prefix = require('gulp-autoprefixer');
gulp.task('styles', function(){
	gulp.src('./dev/styles/*.css')
		.pipe(cleanCSS({compatibility: 'ie8'}))
		.pipe(prefix('last 12 version'))		
		.pipe(gulp.dest('./site/styles'))
		.pipe(connect.reload());
});	


 

// images
var imagemin = require('gulp-imagemin');

gulp.task('images', function(){
	gulp.src('./dev/img/**/*')
		.pipe(imagemin())
		.pipe(gulp.dest('./site/img'))
		.pipe(connect.reload());
});

// watch
gulp.task('watch', function(){
	gulp.watch('./dev/pug/**/*.pug', ['templates']);
	gulp.watch('./dev/styles/*.css', ['styles']);
	gulp.watch('img/**/*.{jpg, png, gif, svg}', {cwd: './dev/'}, ['images']);
});

// connect
var connect = require('gulp-connect-multi')();
gulp.task('connect', connect.server({
	host: '127.0.0.1',
	port: 9090,
	root: ['site'],
	livereload: true,
	open: {
		browser: 'Chrome'
	}
}));

gulp.task('default', ['templates', 'copy', 'styles', 'images']);
gulp.task('dev', ['default', 'connect', 'watch']);