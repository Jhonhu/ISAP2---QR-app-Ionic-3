import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';

import { HttpClient }   from '@angular/common/http';

import { GanadoDetailPage } from '../../pages/ganado-detail/ganado-detail';


@IonicPage()
@Component({
  selector: 'page-qrcode-detail',
  templateUrl: 'qrcode-detail.html',
})
export class QrcodeDetailPage {
  qrData : null;
  createdCode : null;
  scannedCode : null;
  customers: any;
  customer: any;
  item: any;
  idanimal:any;
  detailcustomer: any;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private barcodeScanner: BarcodeScanner, public httpClient: HttpClient) {
                this.item = navParams.get('data');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad QrcodePage');
    this.getId(this.item)
  }

  createCode() {
    this.createdCode = this.idanimal;
  }

  getId(item){
    this.idanimal=this.item.id
  }

}
