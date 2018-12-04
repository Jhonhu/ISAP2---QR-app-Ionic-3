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
import { NewTaskModalPage } from '../pages/new-task-modal/new-task-modal';
import { DetailQrPage } from '../pages/detail-qr/detail-qr';
import { DetailsPage } from '../pages/details/details';
import {QrcodeDetailPage} from '../pages/qrcode-detail/qrcode-detail';


import { environment } from '../environment/environment';

import { NgxQRCodeModule } from 'ngx-qrcode2';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { Camera, CameraOptions } from '@ionic-native/camera';

import { FirebaseService } from '../pages/services/firebase.service';
import { AuthService } from '../pages/services/auth.service';

import { HttpClientModule }   from '@angular/common/http';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';



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
    RegisterPage,
    NewTaskModalPage,
    DetailQrPage,
    DetailsPage,
    QrcodeDetailPage

  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule,
    NgxQRCodeModule,
    AngularFireModule.initializeApp(environment.firebase),
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
    RegisterPage,
    NewTaskModalPage,
    DetailQrPage,
    DetailsPage,
    QrcodeDetailPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    BarcodeScanner,
    Camera,
    FirebaseService,
    AuthService,
  ]
})
export class AppModule {}
