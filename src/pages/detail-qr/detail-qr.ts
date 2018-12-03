import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';

/**
 * Generated class for the DetailQrPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-detail-qr',
  templateUrl: 'detail-qr.html',
})
export class DetailQrPage {
  item: Array<any>;

  constructor(public navCtrl: NavController, public navParams: NavParams, public loadingCtrl: LoadingController) {

    this.item = this.navParams.get('data');
    console.log(this.item)
    this.presentLoading(3000, false);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetailQrPage');
  }

  presentLoading(time, present) {
 let loader = this.loadingCtrl.create({
   content: "Cargando Resultados...",
   dismissOnPageChange: present,
   duration: time,

 });
 loader.present();
}
}
