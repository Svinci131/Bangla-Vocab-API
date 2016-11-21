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
b.transform( reactify );
b.on('update', bundle); // on any dep update, runs the bundler
b.on('log', gutil.log); // output build logs to terminal

function bundle() {
  console.log('Bundling for ' + col.green((process.env.NODE_ENV ? process.env.NODE_ENV : 'development')) + '...');
  return b.bundle()
    // log errors if they happen
    .on('error', function(err) {
      exec("osascript -e 'display notification \"Bundling failed 💩\n" + err + "\'");
      console.log( err );
      gutil.log.bind(gutil, 'Browserify Error');
    })
    .on('end', function() {
      exec("osascript -e 'display notification \"Bundle created successfully\"'");
    })
    .pipe(source( BUNDLE_NAME ))
    .pipe(gulp.dest( DEST ));
} // bundle

gulp.task('app', bundle);
