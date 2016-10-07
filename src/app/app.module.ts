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
