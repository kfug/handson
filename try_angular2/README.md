[[TOC]]

# Angular2 ハンズオン
これはAngular 2ハンズオン@FRONTEND CONFERENCE 2016用の資料です。

http://kfug.jp/handson/try_angular2/

## はじめに

これはAngular 2ハンズオン@FRONTEND CONFERENCE 2016用の資料です。
このハンズオンではAngular 2公式の[チュートリアル](https://angular.io/docs/ts/latest/quickstart.html)をベースに行います。
開発環境として、ブラウザ上でTypeScript開発のできる[Plunker](https://plnkr.co/)を使用します。
Angularのバージョンは、執筆時点での最新版の2.0.0-beta.8を使用しています。

## まずは肩慣らし

以下のURLにプロジェクトの雛形を用意しています。

https://plnkr.co/edit/lQSTnTR8oZp7sauUjlnI

早速、Angular 2アプリの構成単位となるComponentを実装してみましょう。
「New File」から新しく `app/app.component.ts` というファイルを追加してください。
.tsはTypeScriptファイルの拡張子です。
追加したファイルに以下のようなコードを実装してください。

```TypeScript
import {Component} from 'angular2/core';

@Component({
    selector: 'my-app',
    template: '<h1>My First Angular 2 App</h1>'
})
export class AppComponent { }
```

さて、`import`、`@Component(…)`、`export`、`class AppComponent {}`といきなり見慣れないコードが並んでいるかもしれません。
これらは、JavaScriptの新しい構文を先取りしたものになります。
`import`と`export`はモジュール関連の構文、`class`はクラス定義の構文です。
`@`から始まる部分はデコレータといって、ここでは`AppComponent`クラスに`Component`としての機能を付け加えるような役割をしています。

Angular 2の最小のコンポーネントはこれだけです。
`template`の中身を自分の好きな文字列やHTMLにしても大丈夫ですよ。

このComponentを画面に表示してみましょう。
新に`app/main.ts`というファイルを追加します。
中身は以下の通りです。

```TypeScript
import {bootstrap}    from 'angular2/platform/browser'
import {AppComponent} from './app.component'

bootstrap(AppComponent);
```

2行目で`app/app.component.ts`で定義した`AppComponent`を読み込んでいます。
そして、`bootstrap`という関数に`AppComponent`を与えています。
これで`AppComponent`を使う準備は整いました。

ここで、`index.html`の`body`は以下のようになっています。

```html
<body>
  <my-app>
    loading...
  </my-app>
</body>
```

`<my-app></my-app>`という見慣れないタグがありますね。
これは`app/app.component.ts`で`selector: 'my-app'`と書いていた部分に対応します。
つまり、`<my-app></my-app>`と書いてある部分に`AppComponent`の内容が入ります。

PlunkerでPreviewを見ると、ちゃんと`template`に書いた内容が表示されたでしょうか？
Angular 2の基本は、このようにComponentを作ることとComponentを使うことだけです。

ここまで進めた結果を以下のURLにまとめています。

https://plnkr.co/edit/JRoujsC9Iyev6KdQPDWK

## Webアプリを作ろう

ここまでは簡単すぎましたか？
Angularの魅力をもっと知るために、ユーザーの入力があって、複数ページから構成されるようなWebアプリの実装に進みましょう。

まずは完成図を見てください。

https://angular.io/resources/live-examples/tutorial/ts/plnkr.html

これが、Angular 2を使って、全部で200行ぐらいのTypeScriptで実装されています。
順に実装していきましょう。

### データバインディング

`app.component.ts`の内容を以下のように変更してください。

```TypeScript
import {Component} from 'angular2/core';

interface Hero {
  id: number;
  name: string;
}

@Component({
  selector: 'my-app',
  template:`
    <h1>{{title}}</h1>
    <h2>{{hero.name}} details!</h2>
    <div><label>id: </label>{{hero.id}}</div>
    <div>
      <label>name: </label>
      <div><input [(ngModel)]="hero.name" placeholder="name"></div>
    </div>
  `
})
export class AppComponent {
  public title = 'Tour of Heroes';
  public hero: Hero = {
    id: 1,
    name: 'Windstorm'
  };
}
```

また新しい構文がいくつか出てきました。

まず、`interface`では`Hero`インタフェースを定義しています。
ここでは、`Hero`型は数値型の`id`と文字列型の`name`を持つことを宣言しています。
型が出てきてTypeScriptらしくなってきました。
Plunkerではなく、TypeScriptをオフラインコンパイルする場合は型のエラーがわかるので大規模な開発がやりやすくなります。

次に、`template`の文字列を`'`でも`"`でもなく、`` ` ``で囲っています。
これはtemplate stringという構文です。
本来は、文字列の中に変数の値を埋め込むための構文ですが、template stringの中は自由に改行できるので、`template`のように複数行にわたる長い文字列を書くときには便利です。

前は`AppComponent`の中身が空でしたが、今回は`title`と`hero`というプロパティを持っています。
そして、テンプレートの中に`{{title}}`や`{{hero.name}}`といった記述があります。
`AppComponent`のプロパティがこれらの場所に展開されます。

`[(ngModel)]="hero.name"`も見慣れない記法ですよね。
ここでは`ngModel`という双方向バインディングのための組み込みDirectiveを利用しています。
双方向バインディングによって、フォームの値変更が即座にモデル(`AppComponent`のプロパティ)の値に反映され、表示文字列も変更されます。

双方向バインディングはAngular 1系でも売りの一つでした。
フレームワークを使わずに双方向バインディングを実装するとなると結構大変です。

ここまでのソースを以下のURLにまとめています。

https://plnkr.co/edit/l7xYXFI40DKnbJWC2J5K

### テンプレートファイルの分離

これまではテンプレートを、TypeScriptファイルの中に文字列で埋め込んでいました。
これではTypeScriptファイルが長くなりますし、エディターの支援も効かなくなります。

テンプレートを別ファイルに分離してみましょう。
別ファイルにすることでチーム開発もやりやすくなります。

まず、テンプレート部分を`app/app.component.html`に移します。

```html
<h1>{{title}}</h1>
<h2>{{hero.name}} details!</h2>
<div><label>id: </label>{{hero.id}}</div>
<div>
  <label>name: </label>
  <div><input [(ngModel)]="hero.name" placeholder="name"></div>
</div>
```

`app/app.component.ts`は以下のようになります。

```TypeScript
import {Component} from 'angular2/core';

interface Hero {
  id: number;
  name: string;
}

@Component({
  selector: 'my-app',
  templateUrl: 'app/app.component.html'
})
export class AppComponent {
  public title = 'Tour of Heroes';
  public hero: Hero = {
    id: 1,
    name: 'Windstorm'
  };
}
```

`template`の代わりに`templateUrl`でテンプレートファイルのURLを指定します。
ちょっとスッキリしましたね。

ここまでのソースは以下の通りです。

https://plnkr.co/edit/FiZoOe4VmcSdI9YZaCJc?

### テンプレートの繰り返しと条件分岐、そしてComponentのスタイル

次は、Heroを一つじゃなくてリスト表示し、なおかつクリックして選択したHeroの詳細情報を表示するようにしましょう。

まず、このComponentの中でだけ使うスタイルを`app/app.component.css`に用意します。

```css
.selected {
  background-color: #CFD8DC !important;
  color: white;
}
.heroes {
  margin: 0 0 2em 0;
  list-style-type: none;
  padding: 0;
  width: 10em;
}
.heroes li {
  cursor: pointer;
  position: relative;
  left: 0;
  background-color: #EEE;
  margin: .5em;
  padding: .3em 0;
  height: 1.6em;
  border-radius: 4px;
}
.heroes li.selected:hover {
  background-color: #BBD8DC !important;
  color: white;
}
.heroes li:hover {
  color: #607D8B;
  background-color: #DDD;
  left: .1em;
}
.heroes .text {
  position: relative;
  top: -3px;
}
.heroes .badge {
  display: inline-block;
  font-size: small;
  color: white;
  padding: 0.8em 0.7em 0 0.7em;
  background-color: #607D8B;
  line-height: 1em;
  position: relative;
  left: -1px;
  top: -4px;
  height: 1.8em;
  margin-right: .8em;
  border-radius: 4px 0 0 4px;
}
```

次に`app/app.component.ts`を以下のように書き換えます。

```TypeScript
import {Component} from 'angular2/core';

interface Hero {
  id: number;
  name: string;
}

@Component({
  selector: 'my-app',
  templateUrl: 'app/app.component.html',
  styleUrls: ['app/app.component.css']
})
export class AppComponent {
  title = 'Tour of Heroes';
  heroes = HEROES;
  selectedHero: Hero;
  onSelect(hero: Hero) { this.selectedHero = hero; }
}

var HEROES: Hero[] = [
  { "id": 11, "name": "Mr. Nice" },
  { "id": 12, "name": "Narco" },
  { "id": 13, "name": "Bombasto" },
  { "id": 14, "name": "Celeritas" },
  { "id": 15, "name": "Magneta" },
  { "id": 16, "name": "RubberMan" },
  { "id": 17, "name": "Dynama" },
  { "id": 18, "name": "Dr IQ" },
  { "id": 19, "name": "Magma" },
  { "id": 20, "name": "Tornado" }
];
```

`styleUrls`というパラメータを追加して、スタイルファイルのURLを指定します。
もちろん`styles`というパラメータで直接スタイルを書くこともできます。

`AppComponent`の中身も、`heroes`というリストを定義して、その中から一つのヒーローを選択するというロジックを追加しています。

最後に`app/app.component.html`を次のように変更します。

```html
<h1>{{title}}</h1>
<h2>My Heroes</h2>
<ul class="heroes">
  <li *ngFor="#hero of heroes"
    [class.selected]="hero === selectedHero"
    (click)="onSelect(hero)">
    <span class="badge">{{hero.id}}</span> {{hero.name}}
  </li>
</ul>
<div *ngIf="selectedHero">
  <h2>{{selectedHero.name}} details!</h2>
  <div><label>id: </label>{{selectedHero.id}}</div>
  <div>
    <label>name: </label>
    <input [(ngModel)]="selectedHero.name" placeholder="name"/>
  </div>
</div>
```

ここでも新しい要素がいくつか出ています。

まず、`*ngFor="#hero of heroes"`という部分は`heroes`リストの1件1件について、以下の要素を生成します。

```html
<li [class.selected]="hero === selectedHero" (click)="onSelect(hero)">
  <span class="badge">{{hero.id}}</span> {{hero.name}}
</li>
```

今、`heroes`が10個の要素を持っているので、10個の`li`要素が生成されます。

この中に`[class.selected]="hero === selectedHero"`と`(click)="onSelect(hero)"`という記述があります。
一つ目は、`hero === selectedHero`が`true`のとき`selected`というクラスが要素に追加されるようにしています。
二つ目は、`click`のイベント時に`onSelect(hero)`という処理が実行されるようにしています。

次に、`selectedHero`の詳細を表示する部分に`*ngIf="selectedHero"`という記述があります。
最初は`selectedHero`が`undefined`なので、Heroが選択されるまえは表示しないようにしています。
つまり、`selectedHero`が`true`として評価されるときだけ中身の要素が生成されます。
この詳細部分でHeroの名前を変更するとリストにも反映されることが確認できると思います。

このように、テンプレートにデータを結びつけることで画面の表現力を持たせています。

ここまでのコードは以下の通りです。

https://plnkr.co/edit/PycoEpr0IyKPAWhWgRR9

### 子コンポーネント

さて、Componentの機能が増えてきて徐々に見通しがわるくなってきました。
一つ一つのComponentをシンプルに保つことは開発のメンテナンス性を高める上で重要です。
そこで、Heroの詳細を表示する機能をひとまとまりとしてComponentの分割を行ってみます。
このComponentを子Componentとして、親Componentである`AppComponent`から利用します。

まず、`Hero`インタフェースは子コンポーネントと親コンポーネントの両方で使用したいので、新たなファイルに移しましょう。
`app/hero.ts`を作り、以下のような中身にします。

```TypeScript
export interface Hero {
  id: number;
  name: string;
}
```

次に子Componentの実装です。
新たに`app/hero-detail.component.ts`を作り、内容を以下の通りにします。

```TypeScript
import {Component} from 'angular2/core';
import {Hero} from './hero';

@Component({
  selector: 'my-hero-detail',
  templateUrl: 'app/hero-detail.component.html',
  inputs: ['hero']
})
export class HeroDetailComponent {
  hero: Hero;
}
```

テンプレート部分は`app/hero-detail.component.html`として以下のようになります。

```html
<div *ngIf="hero">
  <h2>{{hero.name}} details!</h2>
  <div><label>id: </label>{{hero.id}}</div>
  <div>
    <label>name: </label>
    <input [(ngModel)]="hero.name" placeholder="name"/>
  </div>
</div>
```

また、`app/app.component.ts`を以下のように修正します。

```TypeScript
import {Component} from 'angular2/core';
import {Hero} from './hero';
import {HeroDetailComponent} from './hero-detail.component';

@Component({
  selector: 'my-app',
  templateUrl: 'app/app.component.html',
  styleUrls: ['app/app.component.css'],
  directives: [HeroDetailComponent]
})
export class AppComponent {
  title = 'Tour of Heroes';
  heroes = HEROES;
  selectedHero: Hero;
  onSelect(hero: Hero) { this.selectedHero = hero; }
}

var HEROES: Hero[] = [
  { "id": 11, "name": "Mr. Nice" },
  { "id": 12, "name": "Narco" },
  { "id": 13, "name": "Bombasto" },
  { "id": 14, "name": "Celeritas" },
  { "id": 15, "name": "Magneta" },
  { "id": 16, "name": "RubberMan" },
  { "id": 17, "name": "Dynama" },
  { "id": 18, "name": "Dr IQ" },
  { "id": 19, "name": "Magma" },
  { "id": 20, "name": "Tornado" }
];
```

`HeroDetailComponent`を`import`し、`directives`パラメータに与えることでテンプレートで使用可能にしています。

`app/app.component.ts`は以下のようになります。

```html
<h1>{{title}}</h1>
<h2>My Heroes</h2>
<ul class="heroes">
  <li *ngFor="#hero of heroes"
    [class.selected]="hero === selectedHero"
    (click)="onSelect(hero)">
    <span class="badge">{{hero.id}}</span> {{hero.name}}
  </li>
</ul>
<my-hero-detail [hero]="selectedHero"></my-hero-detail>
```

`HeroDetailComponent`の`hero`に`selectedHero`を与えています。
機能はそのままで、ちょっとスッキリしました。

ここまでのコードは以下の通りです。

https://plnkr.co/edit/T8aI1QjR6Ent5OLFsC68

### Service

Componentは画面の表示に集中するべきです。
Componentから画面表示と関係の薄いロジックを切り離すことで、変更に強い開発ができるようになります。
Angular 2では、このようなロジックをServiceとして定義することができます。

Serviceとは具体的にどのようなものでしょうか。
実用的なWebアプリでは、サーバと通信をしてデータベースからデータの取得をしたりすると思います。
例えば、このようなデータ取得のロジックはServiceに切り出すことができます。

ただし、今回の例ではサーバやデータベースまでは用意しないので、どこからともなくデータを取得したことにしてくれるServiceを作ってみます。
このダミーデータを`app/mock-heroes.ts`に以下のように定義します。

```TypeScript
import {Hero} from './hero';

export var HEROES: Hero[] = [
    {"id": 11, "name": "Mr. Nice"},
    {"id": 12, "name": "Narco"},
    {"id": 13, "name": "Bombasto"},
    {"id": 14, "name": "Celeritas"},
    {"id": 15, "name": "Magneta"},
    {"id": 16, "name": "RubberMan"},
    {"id": 17, "name": "Dynama"},
    {"id": 18, "name": "Dr IQ"},
    {"id": 19, "name": "Magma"},
    {"id": 20, "name": "Tornado"}
];
```

次にServiceの定義です。
`app/hero.service.ts`を作り、以下のような内容にします。

```TypeScript
import {Hero} from './hero';
import {HEROES} from './mock-heroes';
import {Injectable} from 'angular2/core';

@Injectable()
export class HeroService {
  getHeroes() {
    return Promise.resolve(HEROES);
  }
  // See the "Take it slow" appendix
  getHeroesSlowly() {
    return new Promise<Hero[]>(resolve =>
      setTimeout(()=>resolve(HEROES), 2000) // 2 seconds
    );
  }
}
```

`@Injectable`デコレータをつけることで`HeroService`にServiceとしての役割ををもたせます。

そして、`app/app.component.ts`の中身を以下のように修正して`HeroService`を利用します。

```TypeScript
import {Component, OnInit} from 'angular2/core';
import {Hero} from './hero';
import {HeroDetailComponent} from './hero-detail.component';
import {HeroService} from './hero.service';

@Component({
  selector: 'my-app',
  templateUrl: 'app/app.component.html',
  styleUrls: ['app/app.component.css'],
  directives: [HeroDetailComponent],
  providers: [HeroService]
})
export class AppComponent implements OnInit {
  title = 'Tour of Heroes';
  heroes: Hero[];
  selectedHero: Hero;
  
  constructor(private _heroService: HeroService) { }
  
  getHeroes() {
    this._heroService.getHeroes().then(heroes => this.heroes = heroes);
  }
  
  ngOnInit() {
    this.getHeroes();
  }
  
  onSelect(hero: Hero) { this.selectedHero = hero; }
}
```

`providers`パラメータに`import`した`HeroService`を登録しています。

`constructor`で`AppComponent`が生成された時に`HeroService`のインスタンスを`private`なプロパティとして保持します。

また、`OnInit`というインタフェースを実装していることに気づいたかもしれません。
これはAngular 2の提供するComponent Lifecycle Hookの一つです。
ここでは、`AppComponent`がComponentとして初期化されるタイミングで`ngOnInit`メソッドが呼び出されます。
ここで、`HeroService`を利用してHeroのリストを取得しています。

これによって、Heroの取得処理をServiceに切り離すことができました。

ここまでのソースは以下の通りです。

https://plnkr.co/edit/anjQimKjwGeEVfIOuHbq?p=preview

### Routing

Componentの組み立て方はわかってきましたか？
それでは、複数のComponentを使って、複数ページから構成されるWebページを作ってみましょう。

`AppComponent`をダッシュボード、Heroリスト、Hero詳細の3画面に分割します。
各画面の実装を順にしていきます。

`app/dashboard.component.ts`

```TypeScript
import { Component, OnInit } from 'angular2/core';
import { Router } from 'angular2/router';

import { Hero } from './hero';
import { HeroService } from './hero.service';

@Component({
  selector: 'my-dashboard',
  templateUrl: 'app/dashboard.component.html',
  styleUrls: ['app/dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  heroes: Hero[] = [];

  constructor(
    private _router: Router,
    private _heroService: HeroService) {
  }

  ngOnInit() {
    this._heroService.getHeroes()
      .then(heroes => this.heroes = heroes.slice(1,5));
  }

  gotoDetail(hero: Hero) {
    let link = ['HeroDetail', { id: hero.id }];
    this._router.navigate(link);
  }
}
```

`app/dashboard.component.html`

```html
<h3>Top Heroes</h3>
<div class="grid grid-pad">
  <div *ngFor="#hero of heroes" (click)="gotoDetail(hero)" class="col-1-4">
    <div class="module hero">
      <h4>{{hero.name}}</h4>
    </div>
  </div>
</div>
```

`app/dashboard.component.css`

```css
[class*='col-'] {
  float: left;
}

*,
*:after,
*:before {
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
}

h3 {
  text-align: center;
  margin-bottom: 0;
}

[class*='col-'] {
  padding-right: 20px;
  padding-bottom: 20px;
}

[class*='col-']:last-of-type {
  padding-right: 0;
}

.grid {
  margin: 0;
}

.col-1-4 {
  width: 25%;
}

.module {
  padding: 20px;
  text-align: center;
  color: #eee;
  max-height: 120px;
  min-width: 120px;
  background-color: #607D8B;
  border-radius: 2px;
}

h4 {
  position: relative;
}

.module:hover {
  background-color: #EEE;
  cursor: pointer;
  color: #607d8b;
}

.grid-pad {
  padding: 10px 0;
}

.grid-pad > [class*='col-']:last-of-type {
  padding-right: 20px;
}

@media (max-width: 600px) {
  .module {
    font-size: 10px;
    max-height: 75px;
  }
}

@media (max-width: 1024px) {
  .grid {
    margin: 0;
  }
  .module {
    min-width: 60px;
  }
}
```


`app/heroes.component.ts`

```TypeScript
import { Component, OnInit } from 'angular2/core';
import { Router } from 'angular2/router';

import { Hero } from './hero';
import { HeroDetailComponent } from './hero-detail.component';
import { HeroService } from './hero.service';

@Component({
  selector: 'my-heroes',
  templateUrl: 'app/heroes.component.html',
  styleUrls:  ['app/heroes.component.css'],
  directives: [HeroDetailComponent]
})
export class HeroesComponent implements OnInit {
  heroes: Hero[];
  selectedHero: Hero;

  constructor(
    private _router: Router,
    private _heroService: HeroService) { }

  getHeroes() {
    this._heroService.getHeroes().then(heroes => this.heroes = heroes);
  }

  ngOnInit() {
    this.getHeroes();
  }

  onSelect(hero: Hero) { this.selectedHero = hero; }

  gotoDetail() {
    this._router.navigate(['HeroDetail', { id: this.selectedHero.id }]);
  }
}
```

`app/heroes.component.html`

```html
<h2>My Heroes</h2>
<ul class="heroes">
  <li *ngFor="#hero of heroes" [class.selected]="hero === selectedHero" (click)="onSelect(hero)">
    <span class="badge">{{hero.id}}</span> {{hero.name}}
  </li>
</ul>
<div *ngIf="selectedHero">
  <h2>
    {{selectedHero.name | uppercase}} is my hero
  </h2>
  <button (click)="gotoDetail()">View Details</button>
</div>
```

`app/heroes.component.css`

```css
.selected {
  background-color: #CFD8DC !important;
  color: white;
}

.heroes {
  margin: 0 0 2em 0;
  list-style-type: none;
  padding: 0;
  width: 10em;
}

.heroes li {
  cursor: pointer;
  position: relative;
  left: 0;
  background-color: #EEE;
  margin: .5em;
  padding: .3em 0;
  height: 1.6em;
  border-radius: 4px;
}

.heroes li:hover {
  color: #607D8B;
  background-color: #DDD;
  left: .1em;
}

.heroes li.selected:hover {
  background-color: #BBD8DC !important;
  color: white;
}

.heroes .text {
  position: relative;
  top: -3px;
}

.heroes .badge {
  display: inline-block;
  font-size: small;
  color: white;
  padding: 0.8em 0.7em 0 0.7em;
  background-color: #607D8B;
  line-height: 1em;
  position: relative;
  left: -1px;
  top: -4px;
  height: 1.8em;
  margin-right: .8em;
  border-radius: 4px 0 0 4px;
}

button {
  font-family: Arial;
  background-color: #eee;
  border: none;
  padding: 5px 10px;
  border-radius: 4px;
  cursor: pointer;
  cursor: hand;
}

button:hover {
  background-color: #cfd8dc;
}
```


`app/hero-detail.component.ts`

```TypeScript
import { Component, OnInit } from 'angular2/core';
import {RouteParams} from 'angular2/router';

import { Hero } from './hero';
import { HeroService } from './hero.service';

@Component({
  selector: 'my-hero-detail',
  templateUrl: 'app/hero-detail.component.html',
  styleUrls: ['app/hero-detail.component.css'],
  inputs: ['hero']
})
export class HeroDetailComponent implements OnInit {
  hero: Hero;

  constructor(
    private _heroService: HeroService,
    private _routeParams: RouteParams) {
  }

  ngOnInit() {
    let id = +this._routeParams.get('id');
    this._heroService.getHero(id)
      .then(hero => this.hero = hero);
  }

  goBack() {
    window.history.back();
  }
}
```

`app/hero-detail.component.html`

```html
<div *ngIf="hero">
  <h2>{{hero.name}} details!</h2>
  <div>
    <label>id: </label>{{hero.id}}</div>
  <div>
    <label>name: </label>
    <input [(ngModel)]="hero.name" placeholder="name" />
  </div>
  <button (click)="goBack()">Back</button>
</div>
```

`app/hero-detail.component.css`

```css
label {
  display: inline-block;
  width: 3em;
  margin: .5em 0;
  color: #607D8B;
  font-weight: bold;
}

input {
  height: 2em;
  font-size: 1em;
  padding-left: .4em;
}

button {
  margin-top: 20px;
  font-family: Arial;
  background-color: #eee;
  border: none;
  padding: 5px 10px;
  border-radius: 4px;
  cursor: pointer;
  cursor: hand;
}

button:hover {
  background-color: #cfd8dc;
}

button:disabled {
  background-color: #eee;
  color: #ccc;
  cursor: auto;
}
```

`app/hero.service.ts`にも少し変更を加えます。

```TypeScript
import { Hero } from './hero';
import { HEROES } from './mock-heroes';
import { Injectable } from 'angular2/core';

@Injectable()
export class HeroService {
  getHeroes() {
    return Promise.resolve(HEROES);
  }

  // See the "Take it slow" appendix
  getHeroesSlowly() {
    return new Promise<Hero[]>(resolve =>
      setTimeout(()=>resolve(HEROES), 2000) // 2 seconds
    );
  }

	getHero(id: number) {
    return Promise.resolve(HEROES).then(
      heroes => heroes.filter(hero => hero.id === id)[0]
    );
  }
}
```

Routingのために`index.html`の`head`に追記を行います。

```html
  <head>
    <title>angular2 playground</title>
    <link href="style.css" rel="stylesheet" />
    <script>document.write('<base href="' + document.location + '" />');</script>
    <script src="https://code.angularjs.org/2.0.0-beta.8/angular2-polyfills.js"></script>
    <script src="https://code.angularjs.org/tools/system.js"></script>
    <script src="https://code.angularjs.org/tools/typescript.js"></script>
    <script src="config.js"></script>
    <script src="https://code.angularjs.org/2.0.0-beta.8/Rx.js"></script>
    <script src="https://code.angularjs.org/2.0.0-beta.8/angular2.dev.js"></script>
    <script src="https://code.angularjs.org/2.0.0-beta.8/router.dev.js"></script>
    <script src="https://code.angularjs.org/2.0.0-beta.8/http.min.js"></script>
    <script>
      System.import('app')
        .catch(console.error.bind(console));
    </script>
  </head>
```

`<script>document.write('<base href="' + document.location + '" />');</script>`と`<script src="https://code.angularjs.org/2.0.0-beta.8/router.dev.js"></script>`を加えています。

そして、`app/app.component.ts`でRoutingの設定をします。

```TypeScript
import { Component } from 'angular2/core';
import { RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS } from 'angular2/router';

import { HeroService } from './hero.service';
import { DashboardComponent } from './dashboard.component';
import { HeroesComponent } from './heroes.component';
import { HeroDetailComponent } from './hero-detail.component';

@Component({
  selector: 'my-app',
  templateUrl: 'app/app.component.html',
  styleUrls: ['app/app.component.css'],
  directives: [ROUTER_DIRECTIVES],
  providers: [
    ROUTER_PROVIDERS,
    HeroService
  ]
})
@RouteConfig([
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: DashboardComponent,
    useAsDefault: true
  },
  {
    path: '/detail/:id',
    name: 'HeroDetail',
    component: HeroDetailComponent
  },
  {
    path: '/heroes',
    name: 'Heroes',
    component: HeroesComponent
  }
])
export class AppComponent {
  title = 'Tour of Heroes';
}
```

`@RouteConfig`デコレーターでRoutingの設定を行っています。
どの`path`に対してどのComponentを割り当てるかを決めています。

次に、`app/app.component.html`です。

```html
<h1>{{title}}</h1>
<nav>
  <a [routerLink]="['Dashboard']">Dashboard</a>
  <a [routerLink]="['Heroes']">Heroes</a>
</nav>
<router-outlet></router-outlet>
```

`<router-outlet></router-outlet>`の部分に現在の`path`に対するComponentの中身が生成されます。

`app/app.component.css`も子Componentに共通する部分だけにします。

```
h1 {
  font-size: 1.2em;
  color: #999;
  margin-bottom: 0;
}

h2 {
  font-size: 2em;
  margin-top: 0;
  padding-top: 0;
}

nav a {
  padding: 5px 10px;
  text-decoration: none;
  margin-top: 10px;
  display: inline-block;
  background-color: #eee;
  border-radius: 4px;
}

nav a:visited,
a:link {
  color: #607D8B;
}

nav a:hover {
  color: #039be5;
  background-color: #CFD8DC;
}

nav a.router-link-active {
  color: #039be5;
}
```

お疲れ様でした。
ここで実行してみると、リンクをクリックするとページが切り替わっていくのが確認できると思います。

最後のコードはこちらです。

https://plnkr.co/edit/n6WVHorvkkogfpIdy8K6

## おわりに

駆け足でしたが、現時点で公開されているAngular 2のチュートリアルを通しでやってみました。
Componentの扱いといった基本的なことや、Serviceの分離とRoutingなどの大規模開発に必要な要素は一通り押さえられたと思います。

もっと詳しく知りたい人は[Angular 2のサイト](https://angular.io)も読んでみてください。
