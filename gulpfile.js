var gulp = require('gulp')
  ,browserSync = require('browser-sync')
  ,reload = browserSync.reload;

gulp.task('default', function() {
  // place code for your default task here
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