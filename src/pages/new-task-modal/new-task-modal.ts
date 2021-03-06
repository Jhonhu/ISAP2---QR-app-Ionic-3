import { Component } from '@angular/core';
import { ViewController, normalizeURL, ToastController, LoadingController } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { FirebaseService } from '../services/firebase.service';


@Component({
  selector: 'page-new-task-modal',
  templateUrl: 'new-task-modal.html'
})
export class NewTaskModalPage {

  validations_form: FormGroup;
  image: any;
  loading: any;

  constructor(
    private viewCtrl: ViewController,
    private toastCtrl: ToastController,
    private formBuilder: FormBuilder,
    private firebaseService: FirebaseService,
    private loadingCtrl: LoadingController
  ) {
    this.loading = this.loadingCtrl.create();
  }

  ionViewWillLoad(){
    this.resetFields()
  }

  resetFields(){
    this.image = "./assets/imgs/default_image.png";
    this.validations_form = this.formBuilder.group({


      name: new FormControl('', Validators.required),
      age: new FormControl('', Validators.required),
      race: new FormControl('', Validators.required),
      weight: new FormControl('', Validators.required),
      type: new FormControl('', Validators.required),
      health: new FormControl('', Validators.required),
      vaccine: new FormControl('', Validators.required),
      price: new FormControl('', Validators.required),
      size: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      barnyard: new FormControl('', Validators.required),
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
    this.firebaseService.createTask(data)
    .then(
      res => {
        this.resetFields();
        this.viewCtrl.dismiss();
      }
    )
  }

/*  openImagePicker(){
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

}
