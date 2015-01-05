Twitter Bootstrap Template
=============

GULP Commands:
--------------
![Gulp](gulp.png)

* **gulp** - Will run the default tasks, which are: clean, build, buildBower, inject, and serve.
* **clean** - Will clean the public/dist directory.
* **build** - Will first run the clean task, then it will process all *.js file in *public/scripts*
    * process.env.NODE_ENV === prod
        * concat to scripts.js
        * append date and .min to file name
        * Uglify files
        * Output processed files to *public/dist/scripts*.
* **buildBower** - Will first run the build task, then it will process all bower files.
    * process.env.NODE_ENV === prod
        * concat to *bowerScripts.js*
        * append date and .min to file name
        * Uglify files
        * Output processed files to *public/dist/scripts*.
  **inject** - Will first call buildBower, then it will process all JS files in *public/dist* and inject them into *index.html*
