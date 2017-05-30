var gulp = require('gulp');

// Concat JS files
var concat = require('gulp-concat');
gulp.task('scripts', function() {
	return gulp.src('source/javascripts/source/*.js')
		.pipe(concat('site.js'))
		.pipe(gulp.dest('source/javascripts/'));
});

// Inline all CSS and JS, since our scripts are light and it's more reliable than critical path methods
var inlinesource = require('gulp-inline-source');
gulp.task('inlinesource', function () {
	var options = {
		attribute: 'inline=inline'
	};
	return gulp.src('build/**/*.html')
		.pipe(inlinesource(options))
		.pipe(gulp.dest('build/'));
});

// Remove "inline" attribute used by the inlinesource task. It might be harmless, but better be safe.
var attrremover = require('gulp-attr-remover');
function predicate(elem) {
	"use strict";
	if (!/^((ftp|rtsp|mms):)?\/\//.test(elem.attr('href'))) {
		return true;
	}
	return false;
}
gulp.task('removeattributes', function () {
	"use strict";
	gulp.src('build/**/*.html')
		.pipe(attrremover('style', 'inline', predicate))
		.pipe(attrremover('script', 'inline', predicate))
		.pipe(gulp.dest('build/'));
});

// Default tasks
gulp.task('default', ['scripts']);
