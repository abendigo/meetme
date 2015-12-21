var gulp = require('gulp');
var ghPages = require('gulp-gh-pages');
var size = require('gulp-size');
var vulcanize = require('gulp-vulcanize');
var crisper = require('gulp-crisper');
var gif = require('gulp-if');
var babel = require('gulp-babel');
var sourcemaps = require('gulp-sourcemaps');
 
var DIST = 'dist';
var dist = function(subpath) {
    return !subpath ? DIST : path.join(DIST, subpath);
};

gulp.task('deploy', function() {
    return gulp.src('./dist/**/*')
        .pipe(ghPages());
});

gulp.task('vulcanize', function() {
    return gulp.src('app/index.html')
        .pipe(size({
            showFIles: true,
            title: 'src'
        }))
        .pipe(vulcanize({
            stripComments: true,
            inlineCss: true,
            inlineScripts: true
        }))
        .pipe(size({
            showFiles: true,
            title: 'dest'
        }))
        .pipe(gulp.dest('dist'));
});


gulp.task('marko', function() {
    return gulp.src('app/index.html')
        // .pipe(sourcemaps.init({debug: true}))
        .pipe(size({
            showFIles: true,
            title: 'src'
        }))
        .pipe(vulcanize({
            stripComments: true,
            inlineCss: true,
            inlineScripts: false
        }))
        .pipe(size({
            showFiles: true,
            title: 'vulcanized'
        }))
        .pipe(crisper({
            scriptInHead: false,
            onlySplit: false
        }))
        .pipe(size({
            showFiles: true,
            title: 'crisp'
        }))
        // .pipe(gif('*.js', babel({
        //     presets: ['es2015']
        // })))
        // .pipe(size({
        //     showFiles: true,
        //     title: 'babel'
        // }))
        // .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('dist'));
});