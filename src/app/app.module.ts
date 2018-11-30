import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { ListPage } from '../pages/list/list';
import { QrcodePage } from '../pages/qrcode/qrcode';
import { GanadoDetailPage } from '../pages/ganado-detail/ganado-detail';
import { GanadoListPage } from '../pages/ganado-list/ganado-list';
import { UploadImagePage } from '../pages/upload-image/upload-image';
import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';

import { NgxQRCodeModule } from 'ngx-qrcode2';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';

import { HttpClientModule }   from '@angular/common/http';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';

const firebaseAuth = {
    apiKey: "AIzaSyBdvg1-6Z0ky9686PT5tFP66KI2ws8D2jw",
    authDomain: "ganado-app.firebaseapp.com",
    databaseURL: "https://ganado-app.firebaseio.com",
    projectId: "ganado-app",
    storageBucket: "ganado-app.appspot.com",
    messagingSenderId: "32195857911"
  };

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    ListPage,
    QrcodePage,
    GanadoDetailPage,
    GanadoListPage,
    UploadImagePage,
    LoginPage,
    RegisterPage

  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule,
    NgxQRCodeModule,
    AngularFireModule.initializeApp(firebaseAuth),
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features,
    AngularFireStorageModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    ListPage,
    QrcodePage,
    GanadoDetailPage,
    GanadoListPage,
    UploadImagePage,
    LoginPage,
    RegisterPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    BarcodeScanner,
    
  ]
})
export class AppModule {}
