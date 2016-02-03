var fs = require('fs')
var browserify = require('browserify')

// src
browserify('src/index.js')
  .transform('babelify')
  .bundle()
  .pipe(fs.createWriteStream('dist/index.js'))

// examples
browserify('examples/app.js')
  .transform('babelify')
  .bundle()
  .pipe(fs.createWriteStream('dist/bundle.js'))
