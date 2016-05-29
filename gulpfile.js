var gulp = require('gulp');
var vulcanize = require('gulp-vulcanize');
var crisper = require('gulp-crisper');

var minifyJs = require('gulp-minify');
var minifyHtml = require('gulp-minify-html');
var _if = require('gulp-if');
var replace = require('gulp-replace');

gulp.task('vulcanize', function() {
  return gulp.src('app/index.html')
    .pipe(vulcanize({
      inlineScripts: true,
    }))
    .pipe(crisper())
    .pipe(_if('*.js', minifyJs()))
    .pipe(_if('*.html', replace('index.js', 'index-min.js')))
    .pipe(_if('*.html', minifyHtml()))
    .pipe(gulp.dest('dist'));
});

gulp.task('default', ['vulcanize']);
