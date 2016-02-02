var fs = require('fs')
var browserify = require('browserify')

browserify('./index.js')
  .transform('babelify')
  .bundle()
  .pipe(fs.createWriteStream('dist/bundle.js'))
