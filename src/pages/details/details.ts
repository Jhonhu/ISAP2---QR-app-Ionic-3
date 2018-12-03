import { Component } from '@angular/core';
import { ViewController, normalizeURL, ToastController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { FirebaseService } from '../services/firebase.service';
import { Camera, CameraOptions } from '@ionic-native/camera';
import firebase from 'firebase';


@Component({
  selector: 'page-details',
  templateUrl: 'details.html'
})
export class DetailsPage {

  validations_form: FormGroup;
  image: any;
  item: any;
  loading: any;
  captureDataUrl: string;


  constructor(
    private navParams: NavParams,
    private alertCtrl: AlertController,
    private viewCtrl: ViewController,
    private toastCtrl: ToastController,
    private formBuilder: FormBuilder,
    private firebaseService: FirebaseService,
    private loadingCtrl: LoadingController,
    private camera: Camera,
  ) {
    this.loading = this.loadingCtrl.create();
    this.item = navParams.get('data');
  }

  ionViewWillLoad(){
    this.getData(this.item)

  }

  getData(item){
    //this.item = this.navParams.get('data');
    this.image = this.item.image;
    this.validations_form = this.formBuilder.group({
      name: new FormControl(this.item.name, Validators.required),
      age: new FormControl(this.item.age, Validators.required),
      race: new FormControl(this.item.race, Validators.required),
      weight: new FormControl(this.item.weight, Validators.required),
      type: new FormControl(this.item.type, Validators.required),
      health: new FormControl(this.item.health, Validators.required),
      vaccine: new FormControl(this.item.vaccine, Validators.required),
      price: new FormControl(this.item.price, Validators.required),
      size: new FormControl(this.item.size, Validators.required),
      description: new FormControl(this.item.description, Validators.required),
      barnyard: new FormControl(this.item.barnyard, Validators.required),

    });
  }

  dismiss() {
   this.viewCtrl.dismiss();
  }

  onSubmit(value){
    let data = {
      name: value.name,
      age: value.age,
      race: value.race,
      weight: value.weight,
      type: value.type,
      health: value.health,
      vaccine: value.vaccine,
      price: value.price,
      size: value.size,
      description: value.description,
      barnyard: value.barnyard,
      image: this.image
    }
    this.firebaseService.updateTask(this.item.id,data)
    .then(
      res => {
        this.viewCtrl.dismiss();
      }
    )
  }

  delete() {
    let confirm = this.alertCtrl.create({
      title: 'Espera un momento',
      message: 'Deseas eliminar a ' + this.item.name + '?',
      buttons: [
        {
          text: 'No',
          handler: () => {}
        },
        {
          text: 'Si',
          handler: () => {
            this.firebaseService.deleteTask(this.item.id)
            .then(
              res => this.viewCtrl.dismiss(),
              err => console.log(err)
            )
          }
        }
      ]
    });
    confirm.present();
  }

/*openImagePicker(){
    this.imagePicker.hasReadPermission()
    .then((result) => {
      if(result == false){
        // no callbacks required as this opens a popup which returns async
        this.imagePicker.requestReadPermission();
      }
      else if(result == true){
        this.imagePicker.getPictures({
          maximumImagesCount: 1
        }).then(
          (results) => {
            for (var i = 0; i < results.length; i++) {
              this.uploadImageToFirebase(results[i]);
            }
          }, (err) => console.log(err)
        );
      }
    }, (err) => {
      console.log(err);
    });
  }

  uploadImageToFirebase(image){
    this.loading.present();
    image = normalizeURL(image);
    let randomId = Math.random().toString(36).substr(2, 5);
    console.log(randomId);

    //uploads img to firebase storage
    this.firebaseService.uploadImage(image, randomId)
    .then(photoURL => {
      this.image = photoURL;
      this.loading.dismiss();
      let toast = this.toastCtrl.create({
        message: 'Image was updated successfully',
        duration: 3000
      });
      toast.present();
    })
  }*/
  async getPicture(sourceType){
    try{

      const options: CameraOptions = {
        quality: 60,
        destinationType: this.camera.DestinationType.DATA_URL,
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE,
        correctOrientation : true
        }
        let result = await this.camera.getPicture(options)

        let image = 'data:image/jpeg;base64,, ${result}';
        let pictures = firebase.storage().ref('pictures/');
        pictures.putString(image, 'data_url');

    }catch (e){
      console.error(e);
    }
}

/*
      console.log(captureDataUrl)
      captureDataUrl = 'data:image/jpeg;base64,' + captureDataUrl;
      console.log(captureDataUrl);
      this.upload(captureDataUrl);

  }

  upload(captureDataUrl) {
    let storageRef = firebase.storage().ref('pictures');
    // Create a timestamp as filename
    const filename = Math.floor(Date.now() / 1000);

    // Create a reference to 'images/todays-date.jpg'
    const imageRef = storageRef.child(`images/${filename}.jpg`);

    imageRef.putString(this.captureDataUrl, firebase.storage.StringFormat.DATA_URL)
      .then((snapshot)=> {
        // Do something here when the data is succesfully uploaded!
        snapshot.ref.getDownloadURL()
        this.showSuccesfulUploadAlert();
    });
  }

  showSuccesfulUploadAlert() {
    let alert = this.alertCtrl.create({
      title: 'Uploaded!',
      subTitle: 'Picture is uploaded to Firebase',
      buttons: ['OK']
    });
    alert.present();
    // clear the previous photo data in the variable
    this.captureDataUrl = "";
  }
*/

}
