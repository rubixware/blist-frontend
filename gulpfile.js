var gulp = require('gulp');
var gulpif = require('gulp-if');
var uglify = require('gulp-uglify');
var notify = require('gulp-notify');
var concat = require('gulp-concat');
var cssmin = require('gulp-cssmin');
var connect = require('gulp-connect');
var gutil = require('gulp-util');
var streamify = require('gulp-streamify');
var livereload = require('gulp-livereload');
var source = require('vinyl-source-stream');
var browserify = require('browserify');
var babelify = require('babelify');
var watchify = require('watchify');

var dependencies = [
	'react',
  'react/addons'
];

var browserifyTask = function(options) {

  var appBundler = browserify({
    entries: [options.src],
		extension: [options.extension],
    debug: options.development,
    cache: {},
    packageCache: {},
    fullPaths: options.development
  })
	.transform("babelify");

  (options.development ? dependencies : [])
  .forEach(function(dep) {
    appBundler.external(dep);
  });

  var rebundle = function() {
    var start = Date.now();
    console.log('Compilando el APP');
    appBundler.bundle()
      .on('error', gutil.log)
      .pipe(source('main.js'))
      .pipe(gulpif(!options.development, streamify(uglify())))
      .pipe(gulp.dest(options.dest))
      .pipe(gulpif(options.development, livereload()))
      .pipe(notify(function() {
        console.log('Se han compilado la APP ' + (Date.now() - start) + 'ms');
      }));
  };

  if (options.development) {
    appBundler = watchify(appBundler);
    appBundler.on('update', rebundle);

    var vendorsBundler = browserify({
      debug: true,
      require: dependencies
    });

    var start = new Date();
    console.log('Compilando las librerias de VENDOR');

    vendorsBundler.bundle()
      .on('error', gutil.log)
      .pipe(source('vendors.js'))
      .pipe(gulpif(!options.development, streamify(uglify())))
      .pipe(gulp.dest(options.dest))
      .pipe(notify(function() {
        console.log('VENDORS se ha compilado ' + (Date.now() - start) + 'ms');
      }));
  }

  rebundle();

};



var cssTask = function (options) {
  if (options.development){
    var run = function () {
      var start = new Date();
      console.log(arguments);
      console.log('Building CSS bundle');
      gulp.src(options.src)
        .pipe(concat('main.css'))
        .pipe(gulp.dest(options.dest))
        .pipe(notify(function() {
          console.log('CSS budle built in ' + (Date.now() - start) + 'ms');
        }));
      };
			run();
      gulp.watch(options.src, run);
    }else {
      gulp.src(options.src)
        .pipe(concat('main.css'))
        .pipe(cssmin())
        .pipe(gulp.dest(options.dest));
    }
};


gulp.task('default', function () {
  livereload.listen();

  browserifyTask({
    development: true,
    src: './app/main.js',
		extension: 'jsx',
    dest: './build'
  });

  cssTask({
    development: true,
    src: './styles/**/*.css',
    dest: './build'
  });

  connect.server({
    root: 'build/',
    port: 3000
  });
});

gulp.task('deploy', function () {
  browserifyTask({
    development: false,
    src: './app/main.js',
    dest: './dist'
  });

  cssTask({
    development: false,
    src: './styles/**/*.css',
    dest: './dist'
  });
});
