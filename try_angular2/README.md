[[TOC]]

# Angular2 ハンズオン
これはAngular 2ハンズオン@FRONTEND CONFERENCE 2016用の資料です。

## はじめに
このハンズオンではAngular 2公式の[チュートリアル](https://angular.io/docs/ts/latest/quickstart.html)を行います。
開発環境として、ブラウザ上でTypeScript開発のできる[Plunker](https://plnkr.co/)を使用します。
Angularのバージョンは、執筆時点での最新版の2.0.0-beta.8を使用しています。

## まずは肩慣らし

以下のURLにプロジェクトの雛形を用意しています。

https://plnkr.co/edit/lQSTnTR8oZp7sauUjlnI

早速、Angular 2アプリの構成単位となるComponentを実装してみましょう。
「New File」から新しく `app/app.component.ts` というファイルを追加してください。
.tsはTypeScriptファイルの拡張子です。
追加したファイルに以下のようなコードを実装してください。

```JavaScript
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

```JavaScript
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

# Webアプリを作ろう

ここまでは簡単すぎましたか？
Angularの魅力をもっと知るために、ユーザーの入力があって、複数ページから構成されるようなWebアプリの実装に進みましょう。

まずは完成図を見てください。

https://angular.io/resources/live-examples/tutorial/ts/plnkr.html

これが、Angular 2を使って、全部で200行ぐらいのTypeScriptで実装されています。
順に実装していきましょう。

## データバインディング

`app.component.ts`の内容を以下のように変更してください。

```JavaScript
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

## テンプレートの繰り返しと条件分岐、そしてComponentのスタイル

次は、Heroを一つじゃなくてリスト表示し、なおかつクリックして選択したHeroの詳細情報を表示するようにしましょう。
`app/app.component.ts`を以下のように書き換えます。

```JavaScript
import {Component} from 'angular2/core';

interface Hero {
  id: number;
  name: string;
}

@Component({
  selector: 'my-app',
  template:`
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
  `,
  styles:[`
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
  `]
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

## 子コンポーネント

Heroの詳細を表示する機能をひとまとまりとしてComponent化してみます。
このComponentを子Componentとして、親Componentである`AppComponent`から利用します。

まず、`Hero`インタフェースは子コンポーネントと親コンポーネントの両方で使用したいので、新たなファイルに移しましょう。
`app/hero.ts`を作り、以下のような中身にします。

```JavaScript
export interface Hero {
  id: number;
  name: string;
}
```

次に子Componentの実装です。
新たに`app/hero-detail.component.ts`を作り、内容を以下の通りにします。

```JavaScript
import {Component} from 'angular2/core';
import {Hero} from './hero';

@Component({
  selector: 'my-hero-detail',
  template: `
    <div *ngIf="hero">
      <h2>{{hero.name}} details!</h2>
      <div><label>id: </label>{{hero.id}}</div>
      <div>
        <label>name: </label>
        <input [(ngModel)]="hero.name" placeholder="name"/>
      </div>
    </div>
  `,
  inputs: ['hero']
})
export class HeroDetailComponent {
  hero: Hero;
}
```

また、`app/app.component.ts`を以下のように修正します。

```JavaScript
import {Component} from 'angular2/core';
import {Hero} from './hero';
import {HeroDetailComponent} from './hero-detail.component';

@Component({
  selector: 'my-app',
  template:`
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
  `,
  styles:[`
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
  `],
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

## Service

Componentは画面の表示に集中するべきです。
Componentから画面表示と関係の薄いロジックを切り離すことで、変更に強い開発ができるようになります。
Angular 2では、このようなロジックをServiceとして定義することができます。

Serviceとは具体的にどのようなものでしょうか。
実用的なWebアプリでは、サーバと通信をしてデータベースからデータの取得をしたりすると思います。
例えば、このようなデータ取得のロジックはServiceに切り出すことができます。

ただし、今回の例ではサーバやデータベースまでは用意しないので、どこからともなくデータを取得したことにしてくれるServiceを作ってみます。
このダミーデータを`app/mock-heroes.ts`に以下のように定義します。

```JavaScript
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

```JavaScript
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

`app/app.component.ts`の中身を以下のように修正して`HeroService`を利用します。

```JavaScript
import {Component, OnInit} from 'angular2/core';
import {Hero} from './hero';
import {HeroDetailComponent} from './hero-detail.component';
import {HeroService} from './hero.service';

@Component({
  selector: 'my-app',
  template:`
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
  `,
  styles:[`
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
  `],
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

# Routing