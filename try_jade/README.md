[[toc]]

# Jade で始める新しい HTML の書き方

- Jade は Node.js 製のテンプレートエンジンです。
- [Haml](http://haml.info/) などに見られるような、インデントで要素の階層を表す構文で初めての人にはとっつきにくい面もアリますが、多様な機能など、静的サイト制作を強力に支援する機能があります。
- Dreamweaver のテンプレート機能のように **共通部分の変更に強い静的サイトを作ることが可能です。**

Jade - Template Engine  
<http://jade-lang.com/>

## HTML がこんな風に書けます！

Jade でマークアップ！

```jade
doctype html
html(lang='en')
  head
    title Try Jade ハンズオン
    script.
      foo = true;
      bar = function () {};
      if (foo) {
        bar(1 + 5)
      }
  body
    h1 Jade
    #container.col
      p You are amazing
      p
        | Jade is a terse and simple
        | templating language with a
        | strong focus on performance
        | and powerful features.
```

Jade ファイルが変換されたらこうなります。

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <title>Try Jade ハンズオン</title>
    <script>
      foo = true;
      bar = function () {};
      if (foo) {
          bar(1 + 5)
      }
    </script>
  </head>
  <body>
    <h1>Jade</h1>
    <div id="container" class="col">
      <p>You are amazing</p>
      <p>
        Jade is a terse and simple
        templating language with a
        strong focus on performance
        and powerful features.
      </p>
    </div>
  </body>
</html>
```

----

ここから先は Node.js を使用します。

<https://nodejs.org/en/>

Node.js の環境がない方はオンライン上でコードを書けるサービス [CodePen](http://codepen.io/) で試していただくことができます。  
※ただし一部の機能については使用していただくことができません。

----

## やってみよう

##### サンプルファイルを [ダウンロード](https://github.com/kfug/handson/archive/try_jade.zip) するか、git 経由で clone します。

```bash
$ git clone https://github.com/kfug/handson -b try_jade
```

[zip ファイルをダウンロード](https://github.com/kfug/handson/archive/try_jade.zip)

##### 作業ディレクトリに移動

```bash
$ cd handson/

// or

$ cd [zip ファイルを展開したディレクトリ]/handson-try_jade/
```

##### パッケージのインストール

```bash
$ npm install
```

##### テキストエディターで、index.jade を編集

編集するファイルはこちらにあります。

`handson/jade/index.jade`

ご使用されてるテキストエディターで、index.jade を開き、以下をコピペしてください。

```jade
//- index.jade
doctype html
html(lang='en')
  head
    title Try Jade ハンズオン
  body
    h1 Hello Jade !!
```

貼り付けできましたら保存してください。

##### Jade ファイルを HTML ファイルにコンパイル

以下コマンドを実行

```bash
$ gulp jade
```

もしくは、

```bash
$ npm run jade
```

`handson/public/` ディレクトリに HTML ファイルが作成されていますか？？

----

もしつまずいたら Jade のコードをオンラインで変換できる、Jade Converter が便利です。

<http://html2jade.org/>

<http://html2jade.vida.io/>

<http://html2jade.herokuapp.com/>

----

## 基本的な機能

### 書き方

※以下サンプルコード内の半角スペースは必ず必要です。

```jade
//- index.jade
doctype html
html
  head
    title Try Jade ハンズオン
  body
    //- 改行したい
    p
      | 改行
      br
      | したい

    //- 改行して `span` タグで囲いたい
    p
      | 改行して
      br
      span `span` タグで囲いたい

    //- リンクの挿入
    a(href="http://kfug.jp/frontconf2016/") link

    //- id, class の付与
    div#id
      | div タグに id が付与されます。

    div.class
      | div タグに class が付与されます。

    div#id.class
      | div タグに id と class が付与されます。

    #id.class
      | タグを省略すると div タグに変換され、id と class が付与されます。

    //- ul タグの中に a タグ挿入
    ul
      li
        a(href="http://kfug.jp/frontconf2016/") link
      //- このようにも書けます。
      li: a(href="http://kfug.jp/frontconf2016/") link
```

[CodePen で見る](http://codepen.io/shimakyohsuke/pen/WwQraX)

### 変数

```jade
//- index.jade
doctype html
html
  head
    title Try Jade ハンズオン
  body
    - var title = "タイトルだよ";
    - var author = "関西フロントエンドUG";
    - var theGreat = "FRONTEND CONFERENCE 2016";

    h1= title
    p I love #{author}
    p Todays event is #{theGreat} !
```

[CodePen で見る](http://codepen.io/shimakyohsuke/pen/oxjbJN)

### Iteration（繰り返し処理）

<http://jade-lang.com/reference/iteration/>

```jade
//- index.jade
doctype html
html
  head
    title Try Jade ハンズオン
  body
    //- こんな風に書けたり、
    ul
      each val in [1, 2, 3, 4, 5]
        li= val
    //- こんな風に書いたり、
    ul
      each val, index in ['zero', 'one', 'two']
        li= index + ': ' + val
    //- こんな風に書いたりできます。
    ul
      each val, index in {1:'one',2:'two',3:'three'}
        li= index + ': ' + val
```

[CodePen で見る](http://codepen.io/shimakyohsuke/pen/yOYeZq)

#### 個人的によく使うやつ

```jade
select(name="birthday_year", required)
  option(value='', selected='selected') -
    - var n = 1990
    while n <= 2016
      option(value=n + '年')
        =n++
        | 年

select(name="birthday_month", required)
  option(value='', selected='selected') -
    - var n = 1
    while n <= 12
      option(value=n + '月')
        =n++
        | 月

select(name="birthday_day", required)
  option(value='', selected='selected') -
    - var n = 1
    while n <= 31
      option(value=n + '日')
        =n++
        | 日
```

[CodePen で見る](http://codepen.io/shimakyohsuke/pen/RaWawo)

### Filters

<http://jade-lang.com/reference/filters/>

※Markdown や CoffeeScript を Jade ファイル内に記述し HTML に変換する場合は、別途必要なパッケージがございます。

```jade
doctype html
html
  head
    title Try Jade ハンズオン
  body
    //- Markdown が書ける
    :markdown
      # Markdown が書けた

      文章が入ります。

    //- CoffeeScript が書ける
    script
      :coffee-script
        console.log 'This is CoffeeScript'
```

※CodePen ではみれません。

----

## 強力な機能

### Includes（外部ファイルの取り込み）

<http://jade-lang.com/reference/includes/>

サンプルファイルを `sample1/` にご用意しております。

```
handson/sample1/index.jade
handson/sample1/_header.jade
handson/sample1/_footer.html
```

**jade/ ディレクトリ内に sample1/ ディレクトリを作成し以下を作成します。**

```jade
//- jade/sample1/index.jade
doctype html
html
  //- ここで head.jade を呼び出し
  include ./_head.jade
  body
    h1 Try Jade ハンズオン
    p Hello! Jade
    //- ここで _footer.html を呼び出し
    include ./_footer.html
```

```jade
//- jade/sample1/_head.jade
head
  title Try Jade ハンズオン
  script(src='/javascripts/jquery.js')
  script(src='/javascripts/app.js')
```

```html
<!-- jade/sample1/_footer.html -->
<div id="footer">
  <p>Copyright (c) KFUG</p>
</div>
```

3ファイル書けたら、以下コマンドを実行

```bash
$ gulp jade
```

もしくは、

```bash
$ npm run jade
```

`handson/public/sample1/index.html` が作成されていますか？？

コンパイル後の HTML

```html
<!doctype html>
<html>
  <head>
    <title>Try Jade ハンズオン</title>
    <script src='/javascripts/jquery.js'></script>
    <script src='/javascripts/app.js'></script>
  </head>
  <body>
    <h1>Try Jade ハンズオン</h1>
    <p>Hello! Jade</p>
    <div id="footer">
      <p>Copyright (c) KFUG</p>
    </div>
  </body>
</html>
```

※CodePen ではみれません。

### Extends（テンプレートの継承）

<http://jade-lang.com/reference/extends/>

サンプルファイルを `sample2/` にご用意しております。

```
handson/sample2/index.jade
handson/sample2/_layout.jade
```

**jade/ ディレクトリ内に sample2/ ディレクトリを作成し以下を作成します。**

```jade
//- jade/sample2/_layout.jade
doctype html
html
  head
    //- block と書いておくと要素を挿入できる
    block title
      //- 上書き用の title が設定されていなければこちらが表示されます。
      title Default title
  body
    //- block と書いておくと要素を挿入できる
    block content
```

```jade
//- jade/sample2/index.jade
extends ./_layout.jade

//- _layout.jade の title を上書きしてます。
block title
  title Article Title

//- _layout.jade の body に追加
block content
  h1 My Article
```

3ファイル書けたら、以下コマンドを実行

```bash
$ gulp jade
```

もしくは、

```bash
$ npm run jade
```

`handson/public/sample2/index.html` が作成されていますか？？

コンパイル後の HTML

```html
<!doctype html>
<html>
  <head>
    <!-- 上書きされたタイトルが出力される。 -->
    <title>Article Title</title>
  </head>
  <body>
    <h1>My Article</h1>
  </body>
</html>
```

※CodePen ではみれません。

### Mixins

<http://jade-lang.com/reference/mixins/>

```jade
mixin pet(name)
  li.pet= name

ul
  +pet('cat')
  +pet('dog')
  +pet('pig')
```

[CodePen で見る](http://codepen.io/shimakyohsuke/pen/LNpGaY)

#### 個人的によく使うやつ

グローバルナビなどに。

```jade
mixin gnav(id, ...items)
  ul(class=id)
    each item in items
      li
        a(href="#{item.dir}")
          | !{item.pageName}

+gnav(
  'gnav',
  {pageName: 'TOP', dir: 'http://example.com/'},
  {pageName: 'ABOUT', dir: 'http://example.com/about/'}
)
```

[CodePen で見る](http://codepen.io/shimakyohsuke/pen/MyaKRP)

パンくずリスト

```jade
mixin breadcrumb(...items)
  nav
    .breadcrumbs
      div(itemscope='itemscope', itemtype='http://data-vocabulary.org/Breadcrumb')
        a(href='/', itemprop='url')
          span(itemprop='title')
            | Home
        | &gt;
      each item in items
        div(itemscope='itemscope', itemtype='http://data-vocabulary.org/Breadcrumb')
          a(href='/#{item.dir}', itemprop='url')
            if(item.next)
              span(itemprop='title')
                | #{item.pageName}
              | &gt;
            else
              span(itemprop='title')
                | #{item.pageName}

+breadcrumb(
  {pageName: '2階層目', dir: 'second/', next: true},
  {pageName: '3階層目', dir: 'third/', next: false}
)
```

[CodePen で見る](http://codepen.io/shimakyohsuke/pen/xVwVVb/)

----

## gulp を使ってコンパイル

gulp でのコンパイルタスクの記述は `gulpfile.js` を参考にしてください。

## Jade を使って簡単な静的サイトなブログが作れる

[Wintersmith](http://wintersmith.io/) や [Hexo](https://hexo.io/) などの Node.js 製の静的サイトジェネレータでも Jade のコンパイルに対応しているものも多いです。

## その他テンプレートエンジン

Jade の記法が特殊で取り扱いしづらいという場合には、同じく Node.js 製のテンプレートエンジンとしてメジャーな EJS という選択肢もあります。

EJS  
<http://ejs.co/>

----

**Let's Try Jade**
