let gulp = require('gulp');
let cleanCSS = require('gulp-clean-css');
let rename = require('gulp-rename');
let sass = require('gulp-sass');
let watch = require('gulp-watch');
let gulpSequence = require('gulp-sequence')
let browserSync = require('browser-sync').create();
let tabify = require('gulp-tabify');

// Static server

gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
});

gulp.task('sass', function () {
    var stream = gulp.src('./scss/styles.scss')
        .pipe(sass())
        .pipe(gulp.dest('./css/'))
        .pipe(rename('styles.css'));
    return stream;
});

gulp.task('minify-css', () => {
    return gulp.src('css/styles.css')
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('./css/'));
});

gulp.task('rebuild-everything', function(callback){
    gulpSequence('sass', 'minify-css')(callback)
});

gulp.task('rebuild-then-reload', ['rebuild-everything'], function (done) {
    browserSync.reload();
    done();
});
 
gulp.task('default', function () {
  return gulp.src('./*.html/*.customizations.css')
    .pipe(tabify(4, true))
    .pipe(gulp.dest('./'));
});

gulp.task('watch', function () {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });

    gulp.watch(['./scss/*.scss', './*.html', './*.js'], ['rebuild-then-reload']);
});