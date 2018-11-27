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

  scanCode() {
    this.barcodeScanner.scan().then(barcodeData => {
      //this.navCtrl.push(CustomerDetailPage, { isEditable:false, customer: "5b97061fcb1d3d84e510332b" });
      this.customer = barcodeData.text;
      console.log(this.customer);
         this.detailcustomer= this.httpClient.get("https://serverdraw2018.herokuapp.com/api/v1/customers/"+ this.customer._id)
        this.navCtrl.push(GanadoDetailPage, { isEditable:false, customer: this.detailcustomer});

    }, (err) => {
        console.log('Error: ', err);
    });
  }

  detail(){
  /*  this.httpClient.get("https://serverdraw2018.herokuapp.com/api/v1/customers/"+ this.customer._id).subscribe((data)=>{
      this.navCtrl.push(CustomerDetailPage, { isEditable:true, customer: data });
    });*/

    this.httpClient.get("https://serverdraw2018.herokuapp.com/api/v1/customers?sort[ContactName]=1").subscribe((data)=>{
      this.customers = data;
      console.log(this.customers);
        this.httpClient.get("https://serverdraw2018.herokuapp.com/api/v1/customers/"+ this.customers._id).subscribe((data)=>{
          console.log(data)//this.navCtrl.push(CustomerDetailPage, { isEditable:true, customer: data });
        });
      });


    /*  var objeto = { _id  : ''};
      for (let i = 1; i <= this.customers; i++){
        objeto._id  = this.customers._id
        console.log(objeto._id + " Id ")*/


/*console.log(objeto._id + " Id ")*/


    /*this.httpClient.get("https://serverdraw2018.herokuapp.com/api/v1/customers?sort[ContactName]="+ this.customer).subscribe((data)=>{
      this.detailcustomer = data;
      console.log(customer);
      console.log(this.detailcustomer);
    });
    this.navCtrl.push(CustomerDetailPage, { isEditable:false, customer: this.detailcustomer, isNew:true});*/

  }
}
