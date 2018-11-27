import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpClient, HttpEventType }   from '@angular/common/http';

/**
 * Generated class for the UploadImagePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-upload-image',
  templateUrl: 'upload-image.html',
})
export class UploadImagePage {

  selectedFile: File = null;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private httpClient: HttpClient,
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UploadImagePage');
  }

  onFileChanged(event) {
    this.selectedFile = <File>event.target.files[0]
  }

  onUpload() {
    const fd= new FormData();
    fd.append('image', this.selectedFile, this.selectedFile.name)
    this.httpClient.post('https://ganadoqr-app.herokuapp.com/api/v1/images/', fd,
    { reportProgress: true,
      observe: 'events'}).subscribe(event => {
        if (event.type === HttpEventType.UploadProgress){
          console.log('UploadProgress: ' + Math.round(event.loaded / event.total * 100)  + '%');
        }
        else if (event.type === HttpEventType.Response) {
          console.log(event);
        }
    });
}

}
