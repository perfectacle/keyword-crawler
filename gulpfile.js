const gulp = require('gulp');
const watch = require('gulp-watch');
const babel = require('gulp-babel');
const eslint = require('gulp-eslint');

gulp.task('eslint', () =>
  gulp.src('./src/**/*.js')
    .pipe(eslint())
    .pipe(eslint.format())
);

gulp.task('babel', () =>
  gulp.src('./src/**/*.js')
    .pipe(babel())
    .pipe(gulp.dest('./dist'))
);

gulp.task('default', ['eslint', 'babel'], () => {
  watch('./src/**/*.js', {events: ['add', 'change']}, () => {
    gulp.start('eslint', 'babel');
  });
});
