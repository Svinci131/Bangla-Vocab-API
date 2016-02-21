'use strict';

// init all the requires
var watchify = require('watchify');
var browserify = require('browserify');
var gulp = require('gulp');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var gutil = require('gulp-util');
var sourcemaps = require('gulp-sourcemaps');
var assign = require('lodash.assign');
var concat = require('gulp-concat-sourcemap');
var fs = require('fs');
var htmlEntities = require('html-entities');
var exec = require('child_process').exec;
var reactify = require('reactify');
var col = require("gulp-util").colors;

// init all the constants
var ENTRY_POINT = './javascript/index.js';
// var LIB_NAME = 'libs.js';
var DEST = './javascript';
var BUNDLE_NAME = 'bundle.js';

// add custom browserify options here
var customOpts = {
  entries: [ENTRY_POINT],
  debug: true
};
var opts = assign({}, watchify.args, customOpts);
var b = watchify(browserify(opts));

// add transformations here
// i.e. b.transform(coffeeify);
b.transform( reactify );
b.on('update', bundle); // on any dep update, runs the bundler
b.on('log', gutil.log); // output build logs to terminal

function bundle() {
  console.log('Bundling for ' + col.green((process.env.NODE_ENV ? process.env.NODE_ENV : 'development')) + '...');
  return b.bundle()
    // log errors if they happen\
    .on('error', function(err) {
      exec("osascript -e 'display notification \"Bundling failed 💩\n" + err + "\" with title \"Honey\" sound name \"Basso\"'");
      console.log( err );
      gutil.log.bind(gutil, 'Browserify Error');
    })
    .on('end', function() {
      exec("osascript -e 'display notification \"Bundle created successfully\" with title \"Honey\" sound name \"Tink\"'");
    })
    .pipe(source( BUNDLE_NAME ))
    // optional, remove if you don't need to buffer file contents
    // .pipe(buffer())
    // optional, remove if you dont want sourcemaps
    // .pipe(sourcemaps.init({loadMaps: true})) // loads map from browserify file
       // Add transformation tasks to the pipeline here.
    // .pipe(sourcemaps.write('./')) // writes .map file
    .pipe(gulp.dest( DEST ));
} // bundle

gulp.task('app', bundle);
// // var gulp = require('gulp');

// // gulp.task ('hello', function () {
// //  console.log("hello")
// // })


// // require the necessary dependencies
// var gulp = require('gulp');
// var source = require('vinyl-source-stream');
// var browserify = require('browserify'); 
// var uglify = require('gulp-uglify');
// var streamify = require('gulp-streamify');
// var babelify = require('babelify');
// var exec = require('child_process').exec;
// var gutil = require('gulp-util');

// // set up tasks
// gulp.task('browserify', function() {
//     // this task will run browserify, just like we did from terminal
//     // but inside this js file instead
//     return browserify('./javascript/index.js')
//         .transform( "babelify", {presets: ["react"]})
//         // this .bundle() method walks through the code
//         // and concatenates all the dependencies in order
//         .bundle()
//         .on('error', function(err) {
//           exec("osascript -e 'display notification \"Bundling failed 💩\n" + err + "\" with title \"Honey\" sound name \"Basso\"'");
//           console.log( err );
//           gutil.log.bind(gutil, 'Browserify Error');
//         })
//         .on('end', function() {
//           exec("osascript -e 'display notification \"Bundle created successfully\" with title \"Honey\" sound name \"Tink\"'");
//         })
//         // here, we take the concatenated dependencies
//         // and "pipe" it to the bundled.js file
//         .pipe( source( 'bundled.js' ) )
//         .pipe( streamify( uglify() ) )
//         // then we write this file to the current directory
//         .pipe( gulp.dest('./javascript/') );
// });

// // this is the awesome part
// // with "watch", we can tell gulp to "watch" all the files
// // in this directory and IF any of those files changes
// // we instruct it to call our browserify task
// gulp.watch('javascript/*', ['browserify']);