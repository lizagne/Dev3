let gulp = require('gulp');
let cleanCSS = require('gulp-clean-css');
let rename = require('gulp-rename');
let sass = require('gulp-sass');
let about = require('gulp-about');
let watch = require('gulp-watch');
let refresh = require('gulp-refresh')
let gulpSequence = require('gulp-sequence');


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

gulp.task('styles', function(callback){
	gulpSequence('sass', 'minify-css')(callback)
});


gulp.task('scss', () => {
  gulp
    .src('src/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('dist'))//Liz added this for gulp-about
    .pipe(refresh())
})

gulp.task('watch', function () {
    refresh.listen() //Liz added this line to help gulp refresh work
	gulp.watch('./scss/*.scss', ['styles']);
});

gulp.task('about', function () {
    return gulp.src('package.json')
        .pipe(about())
        .pipe(gulp.dest('dist'));  // writes dist/about.json 
});


