'use strict';

// modules
var gulp = require('gulp'),
	sass = require('gulp-sass'),
	jshint = require('gulp-jshint'),
    browserSync = require('browser-sync');

// paths
var paths = {
	scssFiles: 'assets/scss/{*,**/*}.scss',
	appJsFiles: 'app/{*,**/*}.js',
	htmlFiles: 'app/{*,**/*}.html',
    cssFiles: 'assets/css/{*,**/*}.css',

	cssDir: 'assets/css'
};

gulp.task('compile-scss', function () {
	gulp.src(paths.scssFiles)
		.pipe(sass())
		.pipe(gulp.dest(paths.cssDir));
});

gulp.task('lint', function () {
	gulp.src([paths.appJsFiles])
		.pipe(jshint())
		.pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('dev', ['compile-scss', 'lint'], function () {
	browserSync.init(
        [
            paths.htmlFiles,
            paths.appJsFiles,
            paths.cssFiles,
            // '!' + paths.bowerComponentsDir,
        ],
        {
            server: {
                baseDir: './',
                index: './app/index.html'
            },
            port : 3000,
            notify: true,
            open: false,
            // XXX: https://github.com/shakyShane/browser-sync/issues/68
            ghostMode: false,
        }
    );

    gulp.watch(paths.scssFiles, ['compile-scss']);
    gulp.watch([paths.appJsFiles], ['lint']);
});

gulp.task('default', ['dev']);