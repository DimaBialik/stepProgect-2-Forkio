const gulp = require("gulp");
const browserSync = require("browser-sync");
const concat = require("gulp-concat");

gulp.task("css", () => {
    const sass = require("gulp-sass")(require("sass"));
    const cleanCSS = require("gulp-clean-css");
    const autoprefixer = require("gulp-autoprefixer");
    return gulp
        .src("./src/scss/*.scss")
        .pipe(sass().on("error", sass.logError))
        .pipe(
            autoprefixer({
                cascade: false,
            })
        )
        .pipe(cleanCSS({ compatibility: "ie8" }))
        .pipe(concat("styles.min.css"))
        .pipe(gulp.dest("./dist/"))
        .pipe(browserSync.stream());
});
gulp.task("clean", () => {
    const clean = require("gulp-clean");
    return gulp.src("./dist/*", { read: false }).pipe(clean());
});

gulp.task("minify-js", () => {
    const uglify = require("gulp-uglify");
    return gulp
        .src("./src/js/*.js")
        .pipe(concat("scripts.min.js"))
        .pipe(uglify())
        .pipe(gulp.dest("./dist"));
});
gulp.task("js-watch", gulp.series("minify-js"), (done) => {
    browserSync.reload();
    done();
});
gulp.task("minify-image", () => {
    const imagemin = require("gulp-imagemin");
    return gulp
        .src("./src/images/**")
        .pipe(imagemin())
        .pipe(gulp.dest("dist/images"));
});
gulp.task(
    "build",
    gulp.series("clean", gulp.parallel("minify-image", "minify-js", "css"))
);

gulp.task("dev", () => {
    browserSync.init({
        server: "./",
    });

    gulp.watch("src/scss/*.scss", gulp.series("css"));
    gulp.watch("src/js/*.js", gulp.series("js-watch"));
    gulp.watch("./*.html").on("change", browserSync.reload);
});
