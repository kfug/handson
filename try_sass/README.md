[[TOC]]

# CSSをもっと便利に。BootstrapとSass入門

SassはCSSをより効率よく書けるようにできる言語です。  
複雑なCSSを管理しやすく整えてくれるSCSS記法に是非挑戦してみましょう!!

基本的なSassを体験した後に、BootstrapのSassファイルを実際に見ることで
Sassがより身近になれるようなハンズオンになっています。

## 本ハンズオンで必要なもの

* インターネットに繋がるPC
* ブラウザ

## 本ハンズオンで利用するサイトの紹介

* Sass.js 
ブラウザからリアルタイムにSassをコンパイルできるサイトです。  
[Sass.js](http://medialize.github.io/playground.sass.js/)  
本ハンズオンでは、SCSSとCSSの変換を確認する際に用います。

* CodePen  
[http://codepen.io/](http://codepen.io/)   
Web制作に使えるHTML、CSS、JSのコードの投稿・共有が出来るサイトです。
本ハンズオンでは、実践的なサンプルでの確認の際に用います。


## 00.Sass概要

* Sass概要  
キーノートを参照ください。

* Sassのインストール方法  
[徹底解説・Sassインストール！（MacもWindowsも）](http://www.monster-dive.com/blog/web_creative/20140407_001132.php)  
本ハンズオンでは時間の都合上、オンライン上のツールを使ってすすめていきます。

## 01.ネストについて

Sassの中で最も便利な機能です。  
CSSをHTMLの構造にあわせて入れ子（ネスト）で書いていくことができます。

特徴

* HTMLのツリー構造と階層構造が同じになるため把握しやすい
* 親のセレクタが変わっても一箇所を書き換えるだけでOK（メンテしやすい）

注意

* ネストしすぎると可読性が落ちる

#### HTML 
``` html
<div class="main">
	<section>
		<h1 class="title">大好きな食べ物</h1>
		<p class="lead">大好きな食べ物をピックアップしてみました。</p>
		<ul class="favorite">
			<li>りんご</li>
			<li>カレーライス</li>
			<li>寿司</li>
		</ul>
	</section>
</div>
```

#### CSS
``` css
.main .title {
  margin-bottom: 40px;
}
.main .lead {
  color: #666;
}
.main .favorite {
  margin-bottom: 16px;
}
.main .favorite li {
  color: red;
}
```

#### Sass
``` scss
.main{
 .title{
	margin-bottom: 40px;
	}
	.lead{
	color: #666;
	}
	.favorite{
	margin-bottom: 16px;
		li{
			color: red;      
		}
	} 
}
```

上記サンプルを実際に触って自由に改変してみましょう。  
[01.ネストについて](http://codepen.io/izuchy/pen/dGEBaz)


## 01.課題（2分）
CSSで定義されたサンプルを開き、`.main-container`を`.business-container`に変更してみましょう。

[CSSで定義されたサンプル](http://codepen.io/izuchy/pen/LNPZNo)

Sassで定義されたサンプルを開き、`.main-container`を`.business-container`に変更してみましょう。

[Sassで定義されたサンプル](http://codepen.io/izuchy/pen/adrxeK)


## 02.親参照セレクタ（＆）

ネストを使うことで、CSSをよりHTMLの構造に合った形で書けることが体験できたとおもいます。  ただし、ネストだけではネストの恩恵を得にくいシーンが存在します。

例えばこの場合、従来のCSSのようにルールセットが同階層に並んでしまいます。
#### Sass
``` scss
.favorite{
	li{
		width: 100px;
	}
	li.apple{
		color: red;
	}
	li.sushi{
		color: gray;
	}
	li.curry{
		color: yellow;			
	}
} 
```

この部分は、`&`を使って親のセレクタを参照し、このように書くことができます。
#### Sass
``` scss
.favorite{
	li{
		width: 100px;
		&.apple{
			color: red;
		}
		&.sushi{
			color: gray;
		}
		&.curry{
			color: yellow;
		}
	}
} 
```


`&`は `:hover` `:hover``:visited`のような擬似クラスへの適応にも使えます。  
また `&`は後方に記述することもできます。

#### Sass
``` scss
.button {
    &:hover  {
      color: red;
    } //-> .button:hover
    footer & { 
      color: gray;
    } //-> footer .button
}
```
##02.親参照セレクタ 課題（1分）
上記のサンプルコードを実際に動かしてみて、`&`が付与された場合の結果を体感してみましょう。  
[Sass.js](http://medialize.github.io/playground.sass.js/)  

##03.変数と演算

変数とは、任意の場所で事前に設定した値を用いることができる機能です。  
たとえば、サイト全体の色合いを決めてから複数の箇所で使うような場合に重宝します。

以下の例の場合、`$base-color`という変数を定義し、`red`を設定しています。

####Sass
``` scss
$base-color: red;
.main{
 .title{
 	color: $base-color;
	}
	.lead{
	color: $base-color;
	}
	.favorite{
		li{
			border: 1px solid $base-color;
		}
	} 
}
```

また、`lighten($color,$amount)`や`darken($color,$amount)`を使うと、指定した色の明度を変更することも出来ます。


数値をつかって演算することもできます。
以下の例の場合、`container-width`という変数を定義し
半分のサイズを`.half`というクラスにあてています。

#### Sass

``` scss
$container-width: 720px;
.half{
	width: $container-width / 2;
}
```


## 03.課題（1分）

実際に値を変えてみましょう  
`$gray-base-color`の変数を`#362`に変更してみましょう。

[変数定義サンプル](http://codepen.io/izuchy/pen/mVYZvx)

## 04.コメント

Sassでは、`//`による一行コメントを使うことができます。

#### Sass
 
``` scss
//タイトル用のクラス
.title{
	//フォントサイズは16pxです
	font-size: 16px;
}
```

従来のCSSのコメントもつかうことができます。  
一行コメントとは違いコンパイル後にも残ります。

#### Sass
``` scss
/*
	タイトル用のクラス
*/
.title{
	/*フォントサイズは16pxです*/
	font-size: 16px;
}
```
## 04.課題（1分）

上記のサンプルコードを実際に動かしてみて、コメントを書いた場合の出力結果を確認してみましょう。  
[Sass.js](http://medialize.github.io/playground.sass.js/)  

## 05.@import


CSSでの@import

#### CSS

``` css
@import "style.css"
```
上記のように記述するとCSSの場合インポート先のCSSファイルを読み込みます。
しかし、Sassのインポートの場合は、インポートしたSassファイル内に展開されます。
そして、1つのCSSファイルになります。

しかしこの場合インポートしたSassファイルが存在してしまいます。

この場合パーシャルという機能を使います。  
ファイル名の頭に`_`（アンダースコア）を指定すると、コンパイル後にCSSファイルは生成されません。

#### Sass
``` scss
@import "_button.scss"
@import "_label.scss"
```

#### Sass（アンダースコアを省略してパーシャルファイルをインポート）
``` scss
@import "button.scss"
@import "label.scss"
```

#### Sass（拡張子も省略してインポート）
``` scss
@import "button"
@import "label"
```
##05.課題（2分）

上記のサンプルコードを実際に動かしてみて、@importの機能を体験してみましょう。  
[Sass.js](http://medialize.github.io/playground.sass.js/)  

## 06.@extend

extend（エクステンド）の機能を使うと、指定したセレクタのスタイルを継承することができます。

#### Sass
``` scss
.shadow{
	box-shadow: 10px 10px;
}
.box{
	width: 160px;
	@extend .shadow;
}
.navigation{
	@extend .shadow;
}
```

上記のSassをCSSに変換した際に気になるのが、extendしたclassが出力されてしまうということです。

その場合は、`%`というプレースホルダーセレクタをつけると
`box-default`は出力しないようにすることができます。

#### Sass
``` scss
%box-default{
	border: 1px solid #333;
}
.box{
	width: 160px;
	@extend %box-default;
}
```
##06.課題（1分）

``` scss
.shadow{
	box-shadow: 10px 10px;
}
.box{
	width: 160px;
	@extend .shadow;
}
.navigation{
	@extend .shadow;
}
```
上記のコードを実行し、@extendを体験してみましょう。  
[Sass.js](http://medialize.github.io/playground.sass.js/)  

## 07.@mixin

ミックスインとは、スタイルの集まりを別の場所で呼び出すことができる機能です。  
`@extend`と`@mixin`の違いがわかりにくいかもしれません。

#### Sass
``` scss
@mixin box-default{
	width: 160px;
	background: #ddd;
	color: #fff;
}
.box{
	@include box-default;
}
```

`@extend`は一度使ったスタイルを継承しますが、`@mixin`は定義されたスタイルだけ読み込むことができます。

引数を使ったミックスイン
#### Sass
``` scss
@mixin box-default($width){
	width: $width;
	background: #ddd;
	color: #fff;
}
.box{
	@include box-default(160px);
}
```

引数に初期値を定義したミックスイン
#### Sass
``` scss
@mixin box-default($width: 160px){
	width: $width;
	background: #ddd;
	color: #fff;
}
.box{
	@include box-default;
}
.large-box{
	@include box-default(320px);
}
```
##07.課題（2分）
``` scss
@mixin box-default($width: 160px){
	width: $width;
	background: #ddd;
	color: #fff;
}
.box{
	@include box-default;
}
.large-box{
	@include box-default(320px);
}
```
上記のコードを実行し、@mixinを体験してみましょう。  
また、引数となる`width`を変更してみましょう。  
[Sass.js](http://medialize.github.io/playground.sass.js/)  

## 08.Bootstrap

基本的なSassの使い方を学んだあとに、実際にBootstrapのSassファイルを見てみましょう。

#### Bootstrap 概要
BootstrapはTwitter社が開発したCSSのフレームワークです。
Webサイトを作るには通常CSSを一つずつ定義する必要がありますが、よく使われるスタイルがあらかじめ定義されています。当初はTwitter Bootstrapと呼ばれていましたが、現在ではBootstrapと呼ばれています。

Bootstrapを使うとレスポンシブなWebサイトを簡単につくることができます。

[Bootstrap 3 Example](http://getbootstrap.com/examples/theme/)

#### Bootstrap バージョン4系は LessからSassへ移行

[Bootstrap 4 alpha - Moved from Less to Sass. (The Official Bootstrap Blog)](http://blog.getbootstrap.com/2015/08/19/bootstrap-4-alpha/)


#### Sass版公式 Bootstrap 3

[bootstrap-sass](https://github.com/twbs/bootstrap-sass/)

## まとめ

* ネストを使うとHTMLのツリー構造に近い形でCSSを書くことができます
* 変数を使うことでCSSの一貫性をより保つことが出来ます
* mixinは引数を使って定義すると効果的です
* 何事も使いすぎには注意しましょう

