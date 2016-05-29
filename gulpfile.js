var gulp = require('gulp');
var vulcanize = require('gulp-vulcanize');
var crisper = require('gulp-crisper');

gulp.task('vulcanize', function() {
  return gulp.src('app/index.html')
    .pipe(vulcanize({
      inlineScripts: true,
    }))
    .pipe(crisper())
    .pipe(gulp.dest('dist'));
});

gulp.task('default', ['vulcanize']);
