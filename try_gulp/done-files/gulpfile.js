var gulp = require('gulp');
var sass = require('gulp-sass');
var browser = require('browser-sync');// ← browserという名前をつけてbrowser-syncを読み込み
var jade = require('gulp-jade');    // ← jadeという名前をつけてGulp-jadeを読み込み
var uglify = require('gulp-uglify');    // ← uglifyという名前をつけてgulp-uglifyを読み込み
var imagemin = require('gulp-imagemin');    // ← imageminという名前をつけてGulp-imageminを読み込み
var pngquant = require('imagemin-pngquant');    // ← pngquantという名前をつけてimagemin-pngquantを読み込み（imageminで使うプラグイン）
changed  = require('gulp-changed'); // ← changedという名前をつけてGulp-changedを読み込み


gulp.task('sass', function() {
    gulp.src('assets/scss/*scss')
        .pipe(sass())
        .pipe(gulp.dest('public/css'))
        .pipe(browser.reload({stream:true}));   // ← browserのreloadという機能を呼び出す
});

gulp.task('jade', function () {// ← jadeというタスクをつくります宣言。

    gulp.src('assets/tmpl/*jade')// ← このディレクトリにいる拡張子が「jade」のファイルが対象
        .pipe(jade({    // ← jadeをつかう
            pretty: true    // ← 吐き出す時のコードに、改行やインデントを生かす設定
        }))
        .pipe(gulp.dest('public'))// ← このディレクトリに吐き出す
        .pipe(browser.reload({stream:true}));// ← browserのreloadという機能を呼び出す
});

gulp.task('js', function() {    // ← jsというタスクをつくります宣言。
    gulp.src('assets/js/*.js')  // ← このディレクトリにいる拡張子が「js」のファイルが対象
        .pipe(uglify()) // ← uglifyをつかう
        .pipe(gulp.dest('public/js'))// ← このディレクトリに吐き出す
        .pipe(browser.reload({stream:true}));// ← browserのreloadという機能を呼び出す
});

gulp.task('image', function() {
    gulp.src('assets/images/*.{png,jpg,gif}')
        .pipe(changed('public/images'))// ← public/imagesディレクトリに対して、changedをつかう
        .pipe(imagemin({
            progressive: true,
            use: [pngquant()]
        }))
        .pipe(gulp.dest('public/images'))
        .pipe(browser.reload({stream:true}));
});

gulp.task('server', function() {    // ← serverというタスクをつくります宣言。
    browser({   // ← browserを呼び出す
        server: {   // ← browserのserverという機能を呼び出してサーバを立てる
            baseDir: 'public'   // ← publicというディレクトリ以下を表示
        }
    });
});

gulp.task('default',['server'], function() {
    gulp.watch('assets/scss/*scss',['sass']);
    gulp.watch('assets/tmpl/*jade',['jade']);
    gulp.watch('assets/js/*js',['js']);// ← のディレクトリにいる拡張子が「js」のファイルが変更されたらjadeタスクを実行。
    gulp.watch('assets/images/*.{png,jpg,gif}',['image']);// ← のディレクトリにいる拡張子が「png,jpg,gif」のファイルが変更されたらimageタスクを実行。

});