var gulp = require('gulp')
var markdown = require('gulp-markdown-it')
var rename = require('gulp-rename')
var hljs = require('highlight.js')
var rimraf = require('rimraf')
var jade = require('jade')
var through2 = require('through2')
var fs = require('fs')
var postcss = require('gulp-postcss')
var autoprefixer = require('autoprefixer')
var postcssImport = require('postcss-import')
var path = require('path')
var indexTemplate


gulp.task('clean', ()=> {
  rimraf.sync('dist')
})

gulp.task('js', ()=> {
  return gulp.src('src/*.js')
    .pipe(gulp.dest('dist'))
})

gulp.task('load_template', (cb)=> {
  fs.readFile('src/index.jade', 'utf8', function (err, data) {
    if (err) {
      return cb(err)
    }
    indexTemplate = jade.compile(data, {

    })
    console.log(indexTemplate)
    cb()
  })
})

gulp.task('css', (cb)=> {
  return gulp.src('./src/css/style.css')
    .pipe(postcss([
      autoprefixer({browsers: ['last 3 versions']}),
      postcssImport
    ]))
    .pipe(gulp.dest('./dist/css'))
})

gulp.task('html', ['load_template'], ()=> {
  return gulp.src('../try_*/README.md')
    .pipe(markdown({
      plugins: [
        'markdown-it-anchor',
        'markdown-it-named-headers',
        'markdown-it-table-of-contents'
      ],
      options: {
        highlight: (str, lang)=> {
          if (lang && hljs.getLanguage(lang))
            try {
              return hljs.highlight(lang, str).value;
            } catch (__) {}
          return ''; // use external default escaping
        }
      }
    }))
    .pipe(through2.obj(function (data, enc, cb) {
      data.contents = new Buffer(indexTemplate({
        title: data.dirname,
        markdown: data.contents
      }))
      this.push(data)
      cb()
    }))
    .pipe(rename({
      basename: 'index',
      extname: '.html'
    }))
    .pipe(gulp.dest('dist'))
})

gulp.task('default', ['clean', 'js', 'css', 'html'])
