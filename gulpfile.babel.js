import gulp from "gulp";
import sass from "gulp-sass";
import autoprefixer from "gulp-autoprefixer";
import minifyCSS from "gulp-csso";
import browserify from "gulp-browserify";
import babelify from "babelify";
import del from "del";

const paths = {
  styles: {
    src: "src/assets/scss/styles.scss",
    dest: "src/static/styles",
    watch: "src/assets/scss/**/*.scss",
  },
  js: {
    src: "src/assets/js/main.js",
    dest: "src/static/js",
    watch: "src/assets/js/**/*.js",
  },
};

const clean = () => del(["static"]);

const styles = () =>
  gulp
    .src(paths.styles.src)
    .pipe(sass())
    .pipe(
      autoprefixer({
        cascade: false,
      })
    )
    .pipe(minifyCSS())
    .pipe(gulp.dest(paths.styles.dest));

const js = () =>
  gulp
    .src(paths.js.src, { sourcemaps: true })
    .pipe(
      browserify({
        transform: [
          babelify.configure({
            presets: ["@babel/preset-env"],
          }),
        ],
      })
    )
    .pipe(gulp.dest(paths.js.dest));

const watchFiles = () => {
  gulp.watch(paths.styles.watch, styles);
  gulp.watch(paths.js.watch, js);
};

const dev = gulp.series(clean, gulp.parallel(styles, js), watchFiles);

export default dev;
