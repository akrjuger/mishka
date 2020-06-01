"use strict"

var gulp = require("gulp");
var sass = require("gulp-sass");
var plumber = require("gulp-plumber");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var browserSync = require("browser-sync").create();
var minify = require("gulp-csso");
var rename = require("gulp-rename");
var imagemin = require("gulp-imagemin");
var webp = require("gulp-webp");
var svgstore = require("gulp-svgstore");
var posthtml = require("gulp-posthtml");
var include = require("posthtml-include");
var del = require("del");
var htmlmin = require("gulp-htmlmin")
//add html min and js-min


gulp.task("clean", function(){
  return del("build");
})

gulp.task("copy", function(){
  return gulp.src([
    "source/fonts/**/*.{woff,woff2}",
    "source/js/**"
  ],{
    base: "source"
  })
  .pipe(gulp.dest("build"));
});

gulp.task("style", function(done){
  gulp.src("source/sass/style.scss")
    .pipe(plumber())
    .pipe(sass())
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(gulp.dest("build/css"))
    .pipe(minify())
    .pipe(rename("style.min.css"))
    .pipe(gulp.dest("build/css"))
    .pipe(browserSync.stream());

    done();
});

gulp.task("images",function(done) {
  return gulp.src("source/img/**/*.{png,jpg,svg}")
    .pipe(imagemin([
      imagemin.optipng({optimizationLevel: 3}),
      imagemin.mozjpeg({progressive: true}),
      imagemin.svgo()
    ]))
    .pipe(gulp.dest("build/img"))
});

gulp.task("webp", function(done){
  return gulp.src("source/img/**/*.{png,jpg}")
    .pipe(webp({quality : 90}))
    .pipe(gulp.dest("build/img"))
});

gulp.task("sprite", function(){
  return gulp.src("source/img/**/sprite-*.svg")
    .pipe(svgstore({
      inlineSVG : true
    }))
    .pipe(rename("sprite.svg"))
    .pipe(gulp.dest("build/img"));
});

gulp.task("html", function(done){
    gulp.src("source/*.html")
      .pipe(posthtml([
        include()
      ]))
      .pipe(htmlmin({ collapseWhitespace: true }))
      .pipe(gulp.dest("build"));

    browserSync.reload();
    done();
});

// gulp.task("js", function(){
//   return gulp.src('source/js/*.js')
//     .pipe(posthtml({minify}));
//     .pipe(gulp.dest("build"));
// });

gulp.task("serve", function(done) {
  browserSync.init({
    server: {baseDir : "build/"},
    notify: false,
    open: true,
    cors:true,
    ui:false
  });

  gulp.watch("source/sass/**/*.scss", gulp.series("style"));
  gulp.watch("source/*.html", gulp.series("html"));
});

gulp.task('default', gulp.series('style'));
gulp.task('build', gulp.series(
  'clean',
  'copy',
  'style',
  'sprite',
  'images',
  'webp',
  'html'
));
