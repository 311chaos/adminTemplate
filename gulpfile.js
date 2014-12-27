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
  , args = require('yargs').argv
  , ngAnnotate = require('gulp-ng-annotate');


//TODO - Concat and minify any CSS
//TODO - Add LESS to project and include a Gulp task
//TODO - Watch task needs to do more, its not working properly with the concat/minify tasks


var isProd = args.prod;
var injectString = (isProd) ? './public/dist/scripts.min.js' : './public/dist/**/*.js';

//usage from terminal = 'gulp --prod'

gulp.task('default', ['inject'], function() {
  gulp.start('serve');
});

gulp.task('inject', ['build'],  function() {
  return gulp.src('public/index.html')
    .pipe(inject(gulp.src(injectString, {read: false}), {relative: true}))
    .pipe(gulp.dest('./public'));
});

gulp.task('build', ['clean'], function() {
  return gulp.src('public/scripts/*.js')
    .pipe(ngAnnotate({
      remove: true,
      add: true,
      single_quotes: true
    }))
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
      open: false,
      server: {
        baseDir: 'public'
      }
    });

  gulp.watch(['*.html', 'styles/**/*.css', 'scripts/**/*.js'], {cwd: 'public'}, reload);
});