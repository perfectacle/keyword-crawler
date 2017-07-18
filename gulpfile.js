const gulp = require('gulp');
const watch = require('gulp-watch');
const babel = require('gulp-babel');
const eslint = require('gulp-eslint');

const PATH = {
  SRC: {
    BASE: './src',
    JS: './src/**/*.js'
  },
  DIST: {
    BASE: './dist'
  }
};

gulp.task('eslint', () =>
  gulp.src(PATH.SRC.JS)
    .pipe(eslint())
    .pipe(eslint.format())
);

gulp.task('babel', () =>
  gulp.src(PATH.SRC.JS)
    .pipe(babel())
    .pipe(gulp.dest(PATH.DIST.BASE))
);

gulp.task('default', ['eslint', 'babel'], () => {
  watch(PATH.SRC.JS, {events: ['add', 'change']}, () => {
    gulp.start('eslint', 'babel');
  });
});
