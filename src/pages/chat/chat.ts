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
