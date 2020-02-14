"use strict"

var gulp = require("gulp");
var sass = require("gulp-sass");
var plumber = require("gulp-plumber");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var browserSync = require("browser-sync").create();



gulp.task("style", function(done){
  gulp.src("source/sass/style.scss")
    .pipe(plumber())
    .pipe(sass())
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(gulp.dest("source/css"))
    .pipe(browserSync.stream());

    done();
});

gulp.task("serve", function(done) {
  browserSync.init({
    server: {baseDir : "source/"}
    notify: false,
    open: true,
    cors:true,
    ui:false
  });

  gulp.watch("source/sass/**/*.scss", gulp.series("style"));
  gulp.watch("source/*.html").on("change", () => {
    browserSync.reload();
    done();
  });

});

gulp.task('default', gulp.series('style','serve'));
