var gulp = require('gulp')
  ,browserSync = require('browser-sync')
  ,reload = browserSync.reload
  , clean = require('gulp-clean')
  , concat = require('gulp-concat')
  , uglify = require('gulp-uglify')
  , inject = require('gulp-inject')
  , rename = require('gulp-rename')
  , notify = require('gulp-notify')
  , gulpif = require('gulp-if')
  , args = require('yargs').argv;

var isProd = args.prod;
var injectString = (isProd) ? './public/dist/scripts.min.js' : './public/dist/**/*.js';
console.log(isProd);
console.log(injectString);

//usage from the CMD line = 'gulp build --prod'

gulp.task('default', ['inject'], function() {
  // place code for your default task here
  gulp.start('serve');
});

gulp.task('inject', ['build'],  function() {
  return gulp.src('public/index.html')
    .pipe(inject(gulp.src(injectString, {read: false}), {relative: true}))
    .pipe(gulp.dest('./public'));
});

gulp.task('build', ['clean'], function() {
  return gulp.src('public/scripts/*.js')
    .pipe(concat('scripts.js'))
    .pipe(gulp.dest('./public/dist'))
    .pipe(gulpif(isProd, rename({suffix: '.min'})))
    .pipe(gulpif(isProd, uglify()))
    .pipe(gulpif(isProd, gulp.dest('./public/dist')))
    .pipe(notify({message: 'Scripts task complete'}));
});

gulp.task('clean', function () {
  return gulp.src('public/dist', {read: false})
    .pipe(clean());
});

// watch files for changes and reload
gulp.task('serve', function() {
    browserSync({
      server: {
        baseDir: 'public'
      }
    });

  gulp.watch(['*.html', 'styles/**/*.css', 'scripts/**/*.js'], {cwd: 'public'}, reload);
});