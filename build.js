var fs = require('fs')
var browserify = require('browserify')

// src
browserify('src/index.js')
  .transform('babelify')
  .bundle()
  .pipe(fs.createWriteStream('dist/index.js'))

// examples
browserify('examples/todo-list/app.js')
  .transform('babelify')
  .bundle()
  .pipe(fs.createWriteStream('examples/todo-list/dist/bundle.js'))
