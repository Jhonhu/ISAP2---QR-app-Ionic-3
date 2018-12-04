import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { HttpClient }   from '@angular/common/http';

@Component({
  selector: 'page-ganado-detail',
  templateUrl: 'ganado-detail.html',
})
export class GanadoDetailPage {

  ganado:any;
  isEditable: boolean;
  isNew: boolean;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public httpClient: HttpClient
  ){

    this.isEditable = this.navParams.get('isEditable');
    this.ganado = this.navParams.get('ganado');
    this.isNew = this.navParams.get('isNew');
    console.log(this.ganado);
  }

/*  onSave(){
    if(this.isNew){
      // send post method to save
      this.httpClient.post("https://ganadoqr-app.herokuapp.com/api/v1/ganados/", this.ganado ).subscribe((data)=>{
        this.navCtrl.pop();
      }, (error)=>{
        console.log(error);
      });
    }else{
      //sent put method to update
      this.httpClient.put("https://ganadoqr-app.herokuapp.com/api/v1/ganados/", this.ganado ).subscribe((data)=>{
        this.navCtrl.pop();
      }, (error)=>{
        console.log(error);
      });
    }
  }*/

}
