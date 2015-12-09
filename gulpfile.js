var gulp = require('gulp');
var ghPages = require('gulp-gh-pages');
var size = require('gulp-size');
var vulcanize = require('gulp-vulcanize');
 
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
            showFIles: true,
            title: 'dest'
        }))
        .pipe(gulp.dest('dist'));
});
