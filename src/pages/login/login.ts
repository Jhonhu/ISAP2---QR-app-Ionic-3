import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';

import { TabsPage } from '../tabs/tabs';

import { RegisterPage } from '../register/register';

import { AngularFireAuth } from '@angular/fire/auth';
import { ViewChild } from '@angular/core';

import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';

import { AuthService } from '../services/auth.service';

//@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  validations_form: FormGroup;
  errorMessage: string = '';

  validation_messages = {
   'email': [
     { type: 'required', message: 'Se requiere un Email.' },
     { type: 'pattern', message: 'Ingresa un Email valido.' }
   ],
   'password': [
     { type: 'required', message: 'Se requiere contraseña.' },
     { type: 'minlength', message: 'La contraseña debe ser cuando menos 5 caracteres.' }
   ]
 };

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private fire:AngularFireAuth,
              private alertCtrl: AlertController,
              private authService: AuthService,
              private formBuilder: FormBuilder,
              public loadingCtrl: LoadingController
            ) {
              this.presentLoading(3000, false);
            }

  ionViewWillLoad(){
    this.validations_form = this.formBuilder.group({
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      password: new FormControl('', Validators.compose([
        Validators.minLength(5),
        Validators.required
      ])),
    });
  }


    tryLogin(value){
    this.authService.doLogin(value)
    .then(res => {
      this.navCtrl.push(TabsPage);
      this.presentLoading(5000, true)
    }, err => {
      this.errorMessage = err.message;
    })
  }

    goRegisterPage(){
      this.navCtrl.push(RegisterPage);
    }

    presentLoading(time, present) {
   let loader = this.loadingCtrl.create({
     content: "Espere...",
     dismissOnPageChange: present,
     duration: time,

   });
   loader.present();
  }


}
