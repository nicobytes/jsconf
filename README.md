# Ionic Demo (Ionic 2 + Firebase 3)

## 1
 

```
ionic start jsconfco blank --v2
```

## 2

```
cd jsconfco
```

## 3

```
ionic platform add android

```

## 4

```
ionic serve -l
q
```

## 4

src/pages/home/home.ts

```
import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import { Camera } from 'ionic-native';

//import { ChatPage } from '../chat/chat';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  user: any = {};

  constructor(
    public navCtrl: NavController
  ) {
    this.user.image = 'https://api.mipic.co/static/site/css/images/default_avatar.jpg';
  }

  takePicture(){
    let options = {
      destinationType: Camera.DestinationType.DATA_URL,
      targetWidth: 1000,
      targetHeight: 1000,
      quality: 100
    }
    Camera.getPicture( options )
    .then(imageData => {
      this.user.image = `data:image/jpeg;base64,${imageData}`;
    })
    .catch(error =>{
      console.error( error );
    });
  }

  doLogin(){
    /*
    this.navCtrl.push( ChatPage, {
      user: this.user
    });
    */
  }

}
```

## 5

src/pages/home/home.html

```
<ion-header>
  <ion-navbar color="primary">
    <ion-title>
      Login
    </ion-title>
  </ion-navbar>
</ion-header>

<ion-content padding>
  <ion-img [src]="user.image" *ngIf="user.image"></ion-img>
  <button block ion-button (click)="takePicture()">Tomar foto</button>
  <ion-item>
    <ion-label>Ususario</ion-label>
    <ion-input type="text" [(ngModel)]="user.username"></ion-input>
  </ion-item>
  <button block ion-button (click)="doLogin()">Ingresar</button>
</ion-content>

```

## 6

Install plugin

```
ionic plugin add cordova-plugin-camera
``` 

## 7

Create chat page

```
ionic g page chat
``` 

## 8

```
import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ChatPage } from '../pages/chat/chat';


@NgModule({
  declarations: [
    MyApp,
    HomePage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage
  ],
  providers: []
})
export class AppModule {}

```

## 9

src/pages/chat/chat.html
```
<ion-header>
  <ion-navbar color="primary">
    <ion-title>chat</ion-title>
  </ion-navbar>
</ion-header>

<ion-content>
  <h1 padding-horizontal>Hello!</h1>
  <ion-list>
    <ion-item *ngFor="let message of messages">
      <ion-avatar item-left>
        <img [src]="message.user.image">
      </ion-avatar>
      <h2>{{ message.user.username }}</h2>
      <p>{{ message.text }}</p>
    </ion-item>
  </ion-list>
</ion-content>

<ion-footer>
  <ion-grid>
    <ion-row>
      <ion-col width-80>
        <ion-input placeholder="Message" [(ngModel)]="newMessage.text"></ion-input>
      </ion-col>
      <ion-col>
        <button ion-button block icon-only (click)="sendMessage()">
           <ion-icon name="send"></ion-icon>
        </button>
      </ion-col>
    </ion-row>
  </ion-grid>
</ion-footer>
``` 

## 10

src/pages/chat/chat.ts
```
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html'
})
export class ChatPage {

  messages: any[] = [];
  newMessage: any = {};

  constructor(
    public navCtrl: NavController,
    private params: NavParams
  ) {
    this.messages = []; 
  }

  sendMessage(){
    this.newMessage.user = this.params.get('user');
    this.messages.push( this.newMessage );
    this.newMessage = {};
  }

}

```

## 11 Firebase

```
npm install

```

## 12

tsconfig.json

```
{
  "compilerOptions": {
    "allowSyntheticDefaultImports": true,
    "declaration": true,
    "emitDecoratorMetadata": true,
    "experimentalDecorators": true,
    "lib": [
      "dom",
      "es2015"
    ],
    "module": "es2015",
    "moduleResolution": "node",
    "target": "es5",
    "typeRoots": [
      "../node_modules/@types"
    ],
    "types": [
      "firebase"
    ]
  },
  "exclude": [
    "node_modules"
  ],
  "compileOnSave": false,
  "atom": {
    "rewriteTsconfig": false
  }
}

```


## 13

node_modules/@ionic/app-scripts/config/rollup.config.js

```
var nodeResolve = require('rollup-plugin-node-resolve');
var commonjs = require('rollup-plugin-commonjs');
var globals = require('rollup-plugin-node-globals');
var builtins = require('rollup-plugin-node-builtins');
var json = require('rollup-plugin-json');


// https://github.com/rollup/rollup/wiki/JavaScript-API

var rollupConfig = {
  /**
   * entry: The bundle's starting point. This file will
   * be included, along with the minimum necessary code
   * from its dependencies
   */
  entry: 'src/app/main.dev.ts',

  /**
   * sourceMap: If true, a separate sourcemap file will
   * be created.
   */
  sourceMap: true,

  /**
   * format: The format of the generated bundle
   */
  format: 'iife',

  /**
   * dest: the output filename for the bundle in the buildDir
   */
  dest: 'main.js',
  useStrict: false,
  /**
   * plugins: Array of plugin objects, or a single plugin object.
   * See https://github.com/rollup/rollup/wiki/Plugins for more info.
   */
  plugins: [
    builtins(),
    commonjs({
        include: [
        'node_modules/rxjs/**',
        'node_modules/firebase/**',
        'node_modules/angularfire2/**'
        ],
        namedExports: {
        'node_modules/firebase/firebase.js': ['initializeApp', 'auth', 'database'],
        'node_modules/angularfire2/node_modules/firebase/firebase-browser.js': ['initializeApp', 'auth', 'database']
        }
    }),
    nodeResolve({
      module: true,
      jsnext: true,
      main: true,
      browser: true,
      extensions: ['.js']
    }),
    globals(),
    json()
  ]

};


if (process.env.IONIC_ENV == 'prod') {
  // production mode
  rollupConfig.entry = '{{TMP}}/app/main.prod.ts';
  rollupConfig.sourceMap = false;
}


module.exports = rollupConfig;

```

## 14

```
import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ChatPage } from '../pages/chat/chat';

import { AngularFireModule } from 'angularfire2';

export const firebaseConfig = {
  apiKey: "AIzaSyCdAHoKNdWhxktP27uksnTw8S7ZReAIinU",
  authDomain: "jsconfco-8c3c4.firebaseapp.com",
  databaseURL: "https://jsconfco-8c3c4.firebaseio.com",
  storageBucket: "jsconfco-8c3c4.appspot.com",
  messagingSenderId: "298448129509"
};

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ChatPage
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ChatPage
  ],
  providers: []
})
export class AppModule {}

```

## 15

```
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { AngularFire, FirebaseListObservable } from 'angularfire2';


@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html'
})
export class ChatPage {

  messages: FirebaseListObservable<any[]>;
  newMessage: any = {};

  constructor(
    public navCtrl: NavController,
    private params: NavParams,
    private firebase: AngularFire
  ) {
    this.messages = this.firebase.database.list('messages'); 
  }

  sendMessage(){
    this.newMessage.user = this.params.get('user');
    this.messages.push( this.newMessage );
    this.newMessage = {};
  }

}

```

## 16

```
ionic io init
```

## 17

```
ionic state save
```

## 18

```
ionic package build android
```