import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { HttpClient }   from '@angular/common/http';

import { ActionSheetController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';


import { GanadoDetailPage } from '../../pages/ganado-detail/ganado-detail';

import { BarcodeScanner } from '@ionic-native/barcode-scanner';

import { LoginPage } from '../login/login';

@Component({
  selector: 'page-ganado-list',
  templateUrl: 'ganado-list.html',
})
export class GanadoListPage {


  ganados: any;
  ganado: any;
  codedData: any;
  qrcustomer: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public actionSheetCtrl: ActionSheetController,
    public alertCtrl: AlertController,
    public httpClient: HttpClient,
    private barcodeScanner: BarcodeScanner,

  ) {

  }

  onFind(){
    this.httpClient.get("https://ganadoqr-app.herokuapp.com/api/v1/ganados?sort[GanadoName]=1").subscribe((data)=>{
      this.ganados = data;
    });
  }

  ionViewWillEnter(){
    this.onFind();
  }


  onNew(){
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
  }

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

  onDelete(){
    this.httpClient.delete("https://ganadoqr-app.herokuapp.com/api/v1/ganados/"+ this.ganado._id).subscribe((data)=>{
      this.ganado = {};
      this.onFind();
    });
  }

//QR Scanner
  scanCode() {

    this.barcodeScanner.scan().then(barcodeData => {
      var datos = barcodeData.text;

      this.httpClient.get("https://ganadoqr-app.herokuapp.com/api/v1/ganados/"+datos).subscribe((data)=>{

      this.navCtrl.push(GanadoDetailPage, { isEditable:false, ganado: data });
      });
    }, (err) => {
        console.log('Error: ', err);
    });

  }



  botonScan(datos){
    this.httpClient.get("https://ganadoqr-app.herokuapp.com/api/v1/ganados/"+datos).subscribe((data)=>{
    console.log(data);
    this.navCtrl.push(GanadoDetailPage, { isEditable:false, ganado: data });
    });
  }




}
