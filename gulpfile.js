var gulp = require('gulp');
var babel = require('gulp-babel');
var uglify = require('gulp-uglify');
var browserify = require('browserify');
var babelify = require('babelify');
var fs = require('fs');

gulp.task('scripts', function () {
  var opts = {
    entries: 'renderer.es6',
    extensions: ['.jsx', '.es6'],
    debug: true,
    standalone: 'ComponentRenderer'
  };
  return browserify(opts)
    .transform(babelify)
    .bundle()
    .pipe(fs.createWriteStream('ComponentRenderer.js'));
});

gulp.task('default', ['scripts']);