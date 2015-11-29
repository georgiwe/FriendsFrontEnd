'use strict';

var gulp = require('gulp'),
	sass = require('gulp-sass'),
	jshint = require('gulp-jshint'),
	browserSync = require('browser-sync'),
	lazypipe = require('lazypipe'),
	uglify = require('gulp-uglify'),
	minifyCSS = require('gulp-minify-css'),
	gulpif = require('gulp-if'),
	rimraf = require('gulp-rimraf'),
	useref = require('gulp-useref'),
	replace = require('gulp-replace'),
	q = require('q');

var paths = {
	scssFiles: 'assets/scss/{*,**/*}.scss',
	appJsFiles: 'app/**/*.js',
	htmlFiles: 'app/**/*.html',
	cssFiles: 'assets/css/{*,**/*}.css',

	cssDir: 'assets/css',
	dirsToCopyOnBuild: [ 'assets', 'bower_components' ],
	buildDir: 'build/'
};

gulp.task('compile-scss', function () {
	return gulp.src(paths.scssFiles)
		.pipe(sass())
		.pipe(gulp.dest(paths.cssDir));
});

gulp.task('lint', function () {
	return gulp.src([paths.appJsFiles])
		.pipe(jshint())
		.pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('dev', ['compile-scss', 'lint'], function () {
	var watchFiles = [ paths.htmlFiles, paths.appJsFiles, paths.cssFiles ],
		serverSettings = {
			baseDir: './app',
			routes: {
				'/bower_components': './bower_components',
				'/assets': './assets'
			}
		};

	browserSync.init(watchFiles, {
			server: serverSettings,
			port : 3000,
			notify: true,
			open: false,
			// XXX: https://github.com/shakyShane/browser-sync/issues/68
			ghostMode: false
		}
	);

	gulp.watch(paths.scssFiles, ['compile-scss']);
	gulp.watch([paths.appJsFiles], ['lint']);
});

gulp.task('clean', [], function () {
	return gulp.src(paths.buildDir, { read: false })
		.pipe(rimraf());
});

gulp.task('build-dirs', ['clean'], function () {
	var promises = paths.dirsToCopyOnBuild.map(function (dir) {
		return q.when(gulp.src(dir + '/**').pipe(gulp.dest(paths.buildDir + dir)));
	});

    return q.all(promises);
});

gulp.task('build', ['compile-scss', 'build-dirs'], function () {

	var minJs = lazypipe().pipe(uglify),
		minCSS = lazypipe().pipe(minifyCSS, { rebase: false });

	return gulp.src([paths.htmlFiles])
		.pipe(useref())
		.pipe(gulpif('*.js', uglify()))
		.pipe(gulpif('*.css', minifyCSS()))
		.pipe(useref())
		.pipe(replace(/\.\.\//g, ''))
		.pipe(gulp.dest(paths.buildDir));
});

gulp.task('mockdeploy', ['build'], function () {
	browserSync.init([], {
			server: { baseDir: paths.buildDir },
			port : 3000,
			notify: true,
			open: false,
			// XXX: https://github.com/shakyShane/browser-sync/issues/68
			ghostMode: false
		}
	);
});

gulp.task('default', ['dev']);