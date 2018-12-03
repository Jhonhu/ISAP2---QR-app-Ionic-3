import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { AngularFireAuth } from '@angular/fire/auth';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { ViewChild } from '@angular/core';

import { AuthService } from '../services/auth.service';

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

/*  @ViewChild('username') user;
  @ViewChild('password') password;*/

  validations_form: FormGroup;
    errorMessage: string = '';
    successMessage: string = '';

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
            //  private fire: AngularFireAuth,
              private alertCtrl: AlertController,
              private authService: AuthService,
              private formBuilder: FormBuilder
            ) {
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

  tryRegister(value){
  this.authService.doRegister(value)
   .then(res => {
     console.log(res);
     this.errorMessage = "";
     this.successMessage = "Tu cuenta se ha creado. Por favor ingresa.";
   }, err => {
     console.log(err);
     this.errorMessage = err.message;
     this.successMessage = "";
   })
}

goLoginPage(){
  this.navCtrl.pop();
}
/*
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
*/
}
