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
  , ngAnnotate = require('gulp-ng-annotate')
  , moment = require('moment')
  , bowerFiles = require('main-bower-files')
  , filter = require('gulp-filter')
  ,angularFilesort = require('gulp-angular-filesort');



process.env.NODE_ENV = (args.prod) ? 'prod':'dev';
var isProd = args.prod || false;
var injectString = (isProd) ? './public/dist/*.min.js' : './public/dist/**/*.js';
console.log(process.env.NODE_ENV);

var timestamp = moment().format('YYYY_MM_D__hh_mm_ss_a');
var bowerFilters = {
  js: filter('*.js'),
  css: filter('*.css')
};

//TODO - Concat and minify any CSS
//TODO - Add LESS to project and include a Gulp task
//TODO - Watch task needs to do more, its not working properly with the concat/minify tasks
//TODO - JSHint or JSLint
//TODO - Swap clean for Del tasks

//usage from terminal = 'gulp --prod'

gulp.task('default', ['inject'], function() {
  gulp.start('serve');
});

gulp.task('inject', ['buildBower'],  function() {
  return gulp.src('public/index.html')
    .pipe(inject(gulp.src('./public/dist/*.js', {read: false}), {relative: true}))
    .pipe(inject(gulp.src(['./public/dist/bower/*.js', '!./public/dist/bower/bootstrap.js', '!./public/dist/bower/jquery.js'], {read: false}).pipe(angularFilesort()), {name: 'bower', ignorePath: 'public'}))
    .pipe(gulp.dest('./public'));
});

gulp.task('buildBower', ['build'], function() {
  return gulp.src(bowerFiles())
    .pipe(bowerFilters.js)
    .pipe(gulpif(isProd, concat('bowerScripts.js')))
    .pipe(gulpif(isProd, rename({suffix: '.' + timestamp + '.min'})))
    .pipe(gulpif(isProd, uglify()))
    .pipe(notify({message: 'Processing: <%= file.relative %>'}))
    .pipe(gulp.dest("./public/dist/bower"))
});

gulp.task('build', ['clean'], function() {
  return gulp.src('public/scripts/*.js')
    .pipe(ngAnnotate({
      remove: true,
      add: true,
      single_quotes: true
    }))
    .pipe(gulpif(isProd, concat('scripts.js')))
    .pipe(gulpif(isProd, rename({suffix: timestamp  + '.min'})))
    .pipe(gulpif(isProd, uglify()))
    .pipe(gulp.dest('./public/dist'))
    .pipe(notify({message: 'Processing: <%= file.relative %>'}))
    .pipe(notify({
      message: "Build Task Complete"
      , onLast: true }))
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