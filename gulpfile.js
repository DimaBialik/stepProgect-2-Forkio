const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const cleanCSS = require('gulp-clean-css');
const browserSync = require('browser-sync');
const autoprefixer = require('gulp-autoprefixer');
const clean = require('gulp-clean');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');
const imagemin = require('gulp-imagemin');

gulp.task('css', function () {
    return gulp
        .src('./src/scss/index.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(
            autoprefixer({
                cascade: false
            })
        )
        .pipe(cleanCSS({ compatibility: 'ie8' }))
        .pipe(concat('styles.min.css'))
        .pipe(gulp.dest('./dist/'))
        .pipe(browserSync.stream());
});

gulp.task('js', function () {
    return gulp
        .src('./src/js/*.js')
        .pipe(uglify())
        .pipe(concat('scripts.min.js'))
        .pipe(gulp.dest('./dist/'))
        .pipe(browserSync.stream());
});

gulp.task('images', function () {
    return gulp 
        .src('./src/images/**/*.{png,jpg,gif}')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/images'));
});
gulp.task('clean', function () {
    return gulp.src('./dist', { read: false }).pipe(clean());
});
gulp.task('build', gulp.series('clean', gulp.parallel(['css', 'js', 'images'])));

gulp.task('dev', function () {
    gulp.watch('./src/**', gulp.parallel(['css', 'js']));
    gulp.watch('*.html').on('change', browserSync.reload);
});

