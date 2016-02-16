// var gulp = require('gulp');

// gulp.task ('hello', function () {
// 	console.log("hello")
// })


// require the necessary dependencies
var gulp = require('gulp');
var source = require('vinyl-source-stream');
var browserify = require('browserify'); 
var uglify = require('gulp-uglify');
var streamify = require('gulp-streamify');
var babelify = require('babelify');

// set up tasks
gulp.task('browserify', function() {
    // this task will run browserify, just like we did from terminal
    // but inside this js file instead
    return browserify('./index.js')
        .transform( "babelify", {presets: ["react"]})
        // this .bundle() method walks through the code
        // and concatenates all the dependencies in order
        .bundle()
        // here, we take the concatenated dependencies
        // and "pipe" it to the bundled.js file
        .pipe( source( 'bundled.js' ) )
        .pipe( streamify( uglify() ) )
        // then we write this file to the current directory
        .pipe( gulp.dest('./') );
});

// this is the awesome part
// with "watch", we can tell gulp to "watch" all the files
// in this directory and IF any of those files changes
// we instruct it to call our browserify task
gulp.watch('*', ['browserify']);