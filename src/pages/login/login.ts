import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';

import { TabsPage } from '../tabs/tabs';

import { RegisterPage } from '../register/register';

import { AngularFireAuth } from '@angular/fire/auth';
import { ViewChild } from '@angular/core';


@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  @ViewChild('username') user;
  @ViewChild('password') password;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private fire:AngularFireAuth,
              private alertCtrl: AlertController,

            ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }


  alert(message: string){
      this.alertCtrl.create({
        title: 'Info',
        subTitle: message,
        buttons: ['Ok']
      }).present();
    }

    signInUser(){
      this.fire.auth.signInAndRetrieveDataWithEmailAndPassword(this.user.value, this.password.value)
      .then(data =>{
        console.log('got data ', this.fire.auth.currentUser)
        this.alert('Welcome You\'re logged in');
        this.navCtrl.push(TabsPage);
      }).catch(error =>{
        console.log('Error ocurred', error);
        this.alert(error.message);

      })
      //
    }

    register(){
      this.navCtrl.push(RegisterPage);
    }


}
