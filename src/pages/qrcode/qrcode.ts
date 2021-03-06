import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';

import { HttpClient }   from '@angular/common/http';

import { GanadoDetailPage } from '../../pages/ganado-detail/ganado-detail';


@IonicPage()
@Component({
  selector: 'page-qrcode',
  templateUrl: 'qrcode.html',
})
export class QrcodePage {
  qrData : null;
  createdCode : null;
  scannedCode : null;
  customers: any;
  customer: any;


  detailcustomer: any;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private barcodeScanner: BarcodeScanner, public httpClient: HttpClient) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad QrcodePage');
  }

  createCode() {
    this.createdCode = this.qrData;
  }

}
