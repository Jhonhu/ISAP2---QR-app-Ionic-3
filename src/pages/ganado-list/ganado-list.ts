import { Component } from '@angular/core';
import { NavController, NavParams, ModalController, LoadingController  } from 'ionic-angular';
import { HttpClient }   from '@angular/common/http';

import { ActionSheetController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';

import { AngularFireAuth } from '@angular/fire/auth';
import { FirebaseService } from '../services/firebase.service';
import { NewTaskModalPage } from '../new-task-modal/new-task-modal';
import { DetailsPage } from '../details/details';
import { DetailQrPage } from '../detail-qr/detail-qr';

import { GanadoDetailPage } from '../../pages/ganado-detail/ganado-detail';

import { BarcodeScanner } from '@ionic-native/barcode-scanner';

import { AuthService } from '../services/auth.service';
import { AngularFirestore } from 'angularfire2/firestore';
import * as firebase from 'firebase/app';
import 'firebase/storage';

import { LoginPage } from '../login/login';

@Component({
  selector: 'page-ganado-list',
  templateUrl: 'ganado-list.html',
})
export class GanadoListPage {


  /*ganados: any;
  ganado: any;
  codedData: any;
  qrcustomer: any;*/
    items: Array<any>;
    searched: Array<any>;
    private snapshotChangesSubscription: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public actionSheetCtrl: ActionSheetController,
    public alertCtrl: AlertController,
    public httpClient: HttpClient,
    private barcodeScanner: BarcodeScanner,
    private fire: AngularFireAuth,
    private authService: AuthService,
    private firebaseService : FirebaseService,
    private modalCtrl: ModalController,
    private afs: AngularFirestore,
    private loadingCtrl: LoadingController
  ) {

  }
/*
  onFind(){
    this.httpClient.get("https://ganadoqr-app.herokuapp.com/api/v1/ganados?sort[GanadoName]=1").subscribe((data)=>{
      this.ganados = data;
    });
  }*/

  ionViewWillEnter(){
    /*this.onFind();*/
      this.getData();
  }

  getData(){
      this.firebaseService.getTasks()
      .then(tasks => {
        console.log(tasks)
        this.items = tasks;
        console.log(this.items)
      })
    }

    viewDetails(id, item){
    // debugger
    let data = {
      name: item.name,
      age: item.age,
      race: item.race,
      weight: item.weight,
      type: item.type,
      health: item.health,
      vaccine: item.vaccine,
      price: item.price,
      size: item.size,
      description: item.description,
      barnyard: item.barnyard,
      image: item.image,
      id: id,
    }
    console.log(data)
    this.navCtrl.push(DetailsPage, {data: data})
  }

  openNewUserModal(){
    let modal = this.modalCtrl.create(NewTaskModalPage);
    modal.onDidDismiss(data => {
      this.getData();
    });
    modal.present();
    this.presentLoading(1000, true)
  }

  logout(){
    this.authService.doLogout()
    .then(res => {
      this.navCtrl.push(LoginPage);
    })
  }

  scanCode() {

    this.barcodeScanner.scan().then(barcodeData => {
      var datos = barcodeData.text;
      let currentUser = firebase.auth().currentUser;
      console.log(currentUser.uid);
      console.log(this.items)
      this.afs.collection('usuarios').doc(currentUser.uid).collection('ganado').doc(datos).valueChanges()
      .subscribe( snapshots => {
        console.log(currentUser.uid)
        console.log(datos)
        console.log(snapshots)
        this.navCtrl.push(DetailQrPage, { data: snapshots });
      })

    }, (err) => {
        console.log('Error: ', err);
    });

  }

  botonScan(){
    let currentUser = firebase.auth().currentUser;
    console.log(currentUser)
    this.snapshotChangesSubscription  = this.afs.collection('usuarios').doc(currentUser.uid).collection('ganado').doc('87wmaAc668m7v3OKRJmD').valueChanges()
    .subscribe(searched =>{
      console.log(searched);
      this.navCtrl.push(DetailQrPage, { data: searched });
    })
  }

  presentLoading(time, present) {
 let loader = this.loadingCtrl.create({
   content: "Cargando...",
   dismissOnPageChange: present,
   duration: time,

 });
 loader.present();
}

  /*onNew(){
    this.navCtrl.push(GanadoDetailPage, { isEditable:true, ganado: {}, isNew:true });
  }

  itemSelected(ganado){
    var actionSheet = this.actionSheetCtrl.create({
        buttons: [
          {
            text: 'Ver',
            role: 'view',
            handler: () => {
              this.navCtrl.push(GanadoDetailPage, { isEditable:false, ganado: ganado });
            }
          },
          {
            text: 'Editar',
            role: 'edit',
            handler: () => {
              this.navCtrl.push(GanadoDetailPage, { isEditable:true, ganado: ganado});
            }
          },{
            text: 'Eliminar',
            handler: () => {
              this.ganado = ganado;
              this.showPrompt();
            }
          },{
            text: 'Cancelar',
            role: 'cancel',
            handler: () => {
              console.log('Cancel clicked');
            }
          }
        ]
      });
    actionSheet.present();
  }*/
/*
  showPrompt() {
    const prompt = this.alertCtrl.create({
      title: 'Elimiar ganado',
      message: "Estas seguro de elimiar este ganado? ",
      buttons: [
        {
          text: 'Cancelar',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Elimiar',
          handler: data => {
            this.onDelete();
            console.log('Deleted');
          }
        }
      ]
    });
    prompt.present();
  }
*/
/*  onDelete(){
    this.httpClient.delete("https://ganadoqr-app.herokuapp.com/api/v1/ganados/"+ this.ganado._id).subscribe((data)=>{
      this.ganado = {};
      this.onFind();
    });
  }*/

//QR Scanner
/*  scanCode() {

    this.barcodeScanner.scan().then(barcodeData => {
      var datos = barcodeData.text;

      this.httpClient.get("https://ganadoqr-app.herokuapp.com/api/v1/ganados/"+datos).subscribe((data)=>{

      this.navCtrl.push(GanadoDetailPage, { isEditable:false, ganado: data });
      });
    }, (err) => {
        console.log('Error: ', err);
    });

  }*/


/*
  botonScan(datos){
    this.httpClient.get("https://ganadoqr-app.herokuapp.com/api/v1/ganados/"+datos).subscribe((data)=>{
    console.log(data);
    this.navCtrl.push(GanadoDetailPage, { isEditable:false, ganado: data });
    });
  }*/




}
