import gulp from "gulp";
import dartSass from "sass";
import gulpSass from "gulp-sass";
const sass = gulpSass(dartSass);
import sassGlob from "gulp-sass-glob";
import server from "gulp-server-livereload";
import clean from "gulp-clean";
import fs from "fs";
import sourceMaps from "gulp-sourcemaps";
import plumber from "gulp-plumber";
import notify from "gulp-notify";
import csso from "gulp-csso";
import autoprefixer from "gulp-autoprefixer";

const plumberNotify = (title) => {
  return {
    errorHandler: notify.onError({
      title: title,
      message: `Error <%= error.message %>`,
      sound: false,
    }),
  };
};

gulp.task("clean", function (done) {
  if (fs.existsSync("./src/css/")) {
    return gulp.src("./src/css/", { read: false }).pipe(clean());
  }
  done();
});

gulp.task("sass", function () {
  return gulp
    .src("./src/sass/*.scss")
    .pipe(plumber(plumberNotify("SCSS")))
    .pipe(sourceMaps.init())
    .pipe(sassGlob())
    .pipe(sass())
    .pipe(csso())
    .pipe(sourceMaps.write())
    .pipe(gulp.dest("./src/css"));
});

gulp.task("sasslibs", function () {
  return gulp.src("./src/sass/libs/*.scss").pipe(sass()).pipe(csso()).pipe(gulp.dest("./src/css"));
});

gulp.task("server", function () {
  return gulp.src("./src/").pipe(
    server({
      livereload: true,
      open: true,
    })
  );
});

gulp.task("watch", function () {
  gulp.watch("./src/sass/**/*.scss", gulp.parallel("sass"));
  gulp.watch("./src/sass/**/*.scss", gulp.parallel("sasslibs"));
});

gulp.task(
  "default",
  gulp.series("clean", gulp.parallel("sass", "sasslibs"), gulp.parallel("watch", "server"))
);
