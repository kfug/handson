# Try Gulp ハンズオン

Gulp は Node.js 製のタスクランナーツールです。

Web制作の現場で発生するコンパイルや画像圧縮などの処理を、
簡単に実行したり、1つにまとめて処理したりする事が出来ます。

Gulp 公式サイト 

[http://gulpjs.com/]()

## 00.はじめに

サンプルファイルを[ダウンロード](https://github.com/kfug/handson/archive/try_gulp.zip)するか、git経由でcloneしてきます。

````
$ git clone https://github.com/kfug/handson -b try_gulp
````

ハンズオンを始める前に、

```
$ cd [ハンズオンの資料のディレクトリ]/try_gulp
```

とコマンドを使用し、```try_gulp```ディレクトリに入りましょう。

## 01.Sassのコンパイルを試してみよう

### Sassを、ふつうに使ってみる
まずは、普通にSassを試してみましょう。


#### Sassのダウンロード

Sassをインストールしていない、使ったことのない場合は、

```
$ sudo gem install sass
```
でSassをインストールしましょう。

#### Sassのコンパイルの仕方
SassをCSSにコンパイルしてみます。

Sassファイルは``assets/scss``に入っています。SassはこのままではHTMLから読み込むことはできません。SassからCSSに変換（コンパイル）する必要があります。

CSSを吐き出すディレクトリ``public/css``をあらかじめ作っておきましょう。

```
$ sass assets/scss/common.scss:public/css/common.css
```
とコマンドを打つと、``assets/scss/common.scss``に書かれたSassファイルが変換されて``public/css/common.css``にCSSが吐き出されます。

ただ、このコマンドを毎回打つのも面倒です。そして、他のもの（Jade→HTMLや、Javascript/画像の圧縮...等）も同じようにコマンドで動きます。すべてを都度コマンドで動かすのはちょっと大変です。

### Gulpを使って、Sassをコンパイルしてみる
ここで、Gulpを使ってみます。

GulpはNode.js製のツールなので、npmという管理ツールのコマンドで用意していきましょう。


#### Gulp本体のダウンロード

さっそく、Gulpをインストールしてみましょう。

```
$ sudo npm install --global gulp-cli
```

上記コマンドを使うことで、Gulp本体がマシンにインストールされます。（Windowsの場合は``sudo``外してください。）

まずは、Node.jsを使用する際に必要になる管理ツールを初期化しておきます。

```
$ npm init
```

このコマンドを打ってみましょう。

コマンドライン上でいくつか質問されますが、ぜんぶ``Enter``で大丈夫です。
管理したくなったときに学んでみてください。

```
$ npm install --save-dev gulp
```

このコマンドで、これから作業するディレクトリでGulpが使える様になります。

これから先、``gulp``を実行するのは、この``gulpfile.js``のあるディレクトリになります。

#### Gulp用のsassコンパイラのダウンロード

```
$ npm install --save-dev gulp-sass
```

こうすることで、``gulp-sass``というGulp用のsassコンパイラ（こういうNode.jsで使うツールのことをパッケージといいいます）がダウンロードされます。（本体は``node_modules``の中に入ります。これは触ってはいけません。）

#### Gulpファイルの用意

 ``gulpfile.js``を、いつも使っているエディタで開きます。

```
var gulp = require('gulp');
var sass = require('gulp-sass');	// ← Gulp-sassをsassという名前をつけて読み込み。

gulp.task('sass', function() {	// ← sassと名前をつけたタスクを作ります宣言
    gulp.src('assets/scss/*scss')	// ← このディレクトリにいる拡張子が「scss」のファイルが対象
        .pipe(sass())	// ← 読み込んだsassを使う
        .pipe(gulp.dest('public/css'));	// ← このディレクトリに吐き出す
});
```

``gulpfile.js``の中身を上記のようにしてください。
（``//`` の後ろはコメントです。なくても大丈夫です。）

さて、動くか試してみましょう。

``assets/scss/common.scss``のファイルを開いて、ファイルを書き換えてみてください。

```
$ gulp sass
```
とコマンドを打ち、先ほど``sass``と名前をつけたタスクを実行します。

``public/css/common.css``を見てみましょう。書き換えたものが反映されていれば、正しくコンパイルされています。

このように、``gulpfile.js``に設定を最初に書き込んでおくので、実行するコマンドはとても短くて済むのがよいところです。

## 02. watchして処理を自動化

先ほど、ファイルを変更 → コマンドを打つ、の順番でコンパイルしましたが、ファイルを変えるたびにコマンドを打つのはちょっと面倒です。
ファイルが変わったのを検知して、自動でコンパイルが実行されるようにしましょう。

``sass``タスクの下に、下記を記載してください。

```
gulp.task('sass-watch', ['sass'], function(){	// ← sass-watchという名前をつけたタスクをつくります宣言。開始前にsassタスクを実行する、というオプションつきです。
	gulp.watch('assets/scss/*scss',['sass']);	// ← のディレクトリにいる拡張子が「scss」のファイルが変更されたらsassタスクを実行。
})
```

用意ができたら、

```
$ gulp sass-watch
```

とコマンドを打って、さきほど宣言したタスクを実行してみましょう。

今度はタスクが終わらずにずっとターミナルが動きっぱなしになります。

それでは、``assets/scss/common.scss``に変更を加えてみましょう。

ターミナルが動いて、sassタスクが走ったら正解です。``public/css/common.css``を確認すると、変更が反映されています。

## 03. Browser Syncの導入

今度は、ブラウザで変更を確認できるようにしましょう。

先に、``public`` ディレクトリの中に``css/common.css``を読み込む``index.html``を作成しておいてください。

```
<!DOCTYPE html>
<html lang="ja">
<head>
	<meta charset="UTF-8">
	<title>Document</title>
	<link rel="stylesheet" href="css/common.css">
</head>
<body>
	<h1>Try Gulp</h1>
</body>
</html>
```

一度、``sass-watch``を止めるために``ctrl + c``でターミナルを止めましょう。

今度は``browser-sync``というパッケージをダウンロードする必要があります。

```
$ npm install --save-dev browser-sync
```

ダウンロードができたら、gulpfile.jsを編集します。

```
var gulp = require('gulp');
var sass = require('gulp-sass');
var browser = require('browser-sync');// ← browserという名前をつけてbrowser-syncを読み込み

gulp.task('sass', function() {
    gulp.src('assets/scss/*scss')
        .pipe(sass())
        .pipe(gulp.dest('public/css'))
        .pipe(browser.reload({stream:true}));	// ← browserのreloadという機能を呼び出す
});

gulp.task('server', function() {	// ← serverというタスクをつくります宣言。
    browser({	// ← browserを呼び出す
        server: {	// ← browserのserverという機能を呼び出してサーバを立てる
            baseDir: 'public'	// ← publicというディレクトリ以下を表示
        }
    });
});

gulp.task('browser-sync',['server'], function() {	// ← sass-watchというタスクをbrowser-syncというタスクに変更し、実行する前にかならずserverタスクを実行します。
    gulp.watch('assets/scss/*scss',['sass']);
});

```
上記のように変更することで、変更した内容がブラウザ上でも自動で確認できるようになります。

では、実行してみましょう。

```
$ gulp browser-sync
```

ブラウザが立ち上がり、`` public/index.html``が表示されたと思います。

それでは、``assets/scss/common.scss``に変更を加えてみましょう。変更されたら、ブラウザですぐに反映されているのが確認できると思います。

ここで、Gulpのタスクの名前をちょっと変えてみます。

```
gulp.task('browser-sync',['server'], function() {
......
```

上記の行を、

```
gulp.task('default',['server'], function() {
......
```

と変更しましょう。``default``は予約されているタスク名で、

```
$ gulp default
```
としなくても

```
$ gulp
```
と打つだけで実行できるようになります。普段使うタスクには、この``default``という名前を使うと便利です。



## 04. Jadeのコンパイル

それでは、Sass以外のものもコンパイルしてみませんか。一緒に実行できるので便利ですよ。

一度、``sass-watch``を止めるために``ctrl + c``でターミナルを止めましょう。

今度は``browser-sync``というパッケージをダウンロードする必要があります。

```
$ npm install --save-dev gulp-jade
```

ダウンロードができたら、gulpfile.jsを編集します。

```
var gulp = require('gulp');
var sass = require('gulp-sass');
var browser = require('browser-sync');
var jade = require('gulp-jade');	// ← jadeという名前をつけてgulp-jadeを読み込み

......
// sassのタスクは変更ないので省略
......

gulp.task('jade', function () {// ← jadeというタスクをつくります宣言。

    gulp.src('assets/tmpl/*jade')// ← このディレクトリにいる拡張子が「jade」のファイルが対象
        .pipe(jade({	// ← jadeをつかう
            pretty: true	// ← 吐き出す時のコードに、改行やインデントを生かす設定
        }))
        .pipe(gulp.dest('public'))// ← このディレクトリに吐き出す
        .pipe(browser.reload({stream:true}));// ← browserのreloadという機能を呼び出す
});

......
// serverのタスクは変更ないので省略
......

gulp.task('default',['server'], function() {
    gulp.watch('assets/scss/*scss',['sass']);
    gulp.watch('assets/tmpl/*jade',['jade']);// ← のディレクトリにいる拡張子が「jade」のファイルが変更されたらjadeタスクを実行。
});

```

ここまで書けたら、

```
$ gulp
```

を実行して、``assets/tmpl/index.jade``を編集してみましょう。
sassの時と同様、保存と同時にブラウザがリロードされて、変更が確認できたら正解です。
``public/index.html``を見ると、jadeから生成されたファイルに変わっていることが確認できます。

## 05. JSの圧縮

JavaScriptの圧縮にも手を出してみましょう。``gulpfile.js``を
触るときには``ctrl + c``でGulpの動作を一度止めましょう。

JavaScriptの圧縮に使うパッケージは``gulp-uglify``です。ダウンロードしてきましょう。

```
$ npm install --save-dev gulp-uglify
```

ダウンロードが終わったら、``gulpfile.js``を編集します。

```
var gulp = require('gulp');
var sass = require('gulp-sass');
var browser = require('browser-sync');
var jade = require('gulp-jade');
var uglify = require('gulp-uglify');	// ← uglifyという名前をつけてgulp-uglifyを読み込み


......
// sassとjadeのタスクは変更ないので省略
......

gulp.task('js', function() {	// ← jsというタスクをつくります宣言。
    gulp.src('assets/js/*.js')	// ← このディレクトリにいる拡張子が「js」のファイルが対象
        .pipe(uglify())	// ← uglifyをつかう
        .pipe(gulp.dest('./public/js'))// ← このディレクトリに吐き出す
        .pipe(browser.reload({stream:true}));// ← browserのreloadという機能を呼び出す
});

......
// serverのタスクは変更ないので省略
......

gulp.task('default',['server'], function() {
    gulp.watch('assets/scss/*scss',['sass']);
    gulp.watch('assets/tmpl/*jade',['jade']);
    gulp.watch('assets/js/*js',['js']);// ← のディレクトリにいる拡張子が「js」のファイルが変更されたらjadeタスクを実行。

});
```

設定ができたら、

```
$ gulp
```

を実行しましょう。``assets/js/script.js``を編集すると、``public/js/script.js``が吐き出されて、ブラウザがリロードします。

## 06. 画像の圧縮とかも出来ます

画像圧縮のパッケージはたくさん種類があるのですが、今回は``gulp-imagemin``を使用してみます。一度``ctrl + c``でGulpの動作を一度止めましょうね。

```
$ npm install --save-dev gulp-imagemin
$ npm install --save-dev imagemin-pngquant
```
二つ目の``imagemin-pngquant``は、``gulp-imagemin``のオプションに必要になるプラグインです。

``gulpfile.js``は、下記の様にします。

```
var gulp = require('gulp');
var sass = require('gulp-sass');
var browser = require('browser-sync');
var jade = require('gulp-jade');
var uglify = require('gulp-uglify');
var imagemin = require('gulp-imagemin');	// ← imageminという名前をつけてGulp-imageminを読み込み
var pngquant = require('imagemin-pngquant');	// ← pngquantという名前をつけてimagemin-pngquantを読み込み（imageminで使うプラグイン）


......
// sass,jade,jsのタスクは変更ないので省略
......
gulp.task('image', function() {	// ← imageというタスクをつくります宣言。
    gulp.src('assets/images/*')	// ← このディレクトリにいるファイルが対象
        .pipe(imagemin({	// ← imageminをつかう
            use: [pngquant()]	// ← pngquantプラグインを使う
        }))
        .pipe(gulp.dest('public/images'))// ← このディレクトリに吐き出す
        .pipe(browser.reload({stream:true}));// ← browserのreloadという機能を呼び出す
});
......
// serverのタスクは変更ないので省略
......

gulp.task('default',['server'], function() {
    gulp.watch('assets/scss/*scss',['sass']);
    gulp.watch('assets/tmpl/*jade',['jade']);
    gulp.watch('assets/js/*js',['js']);
    gulp.watch('assets/images/*.{png,jpg,gif}',['image']);// ← のディレクトリにいる拡張子が「png,jpg,gif」のファイルが変更されたらimageタスクを実行。
});
```

```
$ gulp
```

を実行します。

実行後に``assets/images/``に、画像を追加・削除してみると、gulpが走って``public/images/``が作られるのがわかります。

``assets/images/``以下の画像ファイルのサイズと``public/images/``以下の画像ファイルサイズを比べて見てみましょう。サイズが小さくなっていたら成功です。

## 07. 差分を見つけて、実行したい

上記で何度か画像を追加してみましょう。``public/images/``の画像は全てタイムスタンプが同じになっていると思います。画像を追加するたびに、全ての画像を生成しているためです。

製作中のサイト内に画像が増えてくると、画像を追加するたびに全ての画像生成しているととても時間がかかってきます。生成前と生成後のフォルダを比較して、違いがあったらその分を生成、という``gulp-changed``というパッケージを入れてみましょう。

```
$ npm install --save-dev gulp-changed
```

```
var gulp = require('gulp');
var sass = require('gulp-sass');
var browser = require('browser-sync');
var jade = require('gulp-jade');
var uglify = require('gulp-uglify');
var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');
var changed  = require('gulp-changed');	// ← changedという名前をつけてGulp-changedを読み込み

......
// sass,jade,jsのタスクは変更ないので省略
......

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

......
// 以下は変更ないので省略
......

```

これで、差分だけに``gulp-imagemin``が実行されるようになりました。
``assets/images/``以下に画像を追加してみてください。``public/images/``の中では追加された画像だけタイムスタンプが変わっているはずです。

このようにして、Gulpでは様々なタスクを一度に実行できるようになります。[http://gulpjs.com/plugins/]()で様々なパッケージを見つけて、サクサクな開発環境を自分のモノにしていきましょう！

* このハンズオンが終了した後の``gulpfile.js``と``package.json``は、``/done-files/``の中に格納されています。参考にしてみてください。
