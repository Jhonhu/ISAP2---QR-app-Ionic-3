import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { AngularFireAuth } from '@angular/fire/auth';
import { ViewChild } from '@angular/core';

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  @ViewChild('username') user;
  @ViewChild('password') password;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private fire: AngularFireAuth,
              private alertCtrl: AlertController,
            ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');

  }

  alert(message: string){
    this.alertCtrl.create({
      title: 'Info',
      subTitle: message,
      buttons: ['Ok']
    }).present();
  }

  registerUser(){
    this.fire.auth.createUserWithEmailAndPassword(this.user.value, this.password.value)
    .then(data =>{
      console.log('got data', data);
      this.alert('Usuario Registrado!');
    }).catch(error =>{
      console.log(error)
      this.alert(error.message);
    })
    console.log('Registra usuario con', this.user.value, this.password.value)
  }

}
