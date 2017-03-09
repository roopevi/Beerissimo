import { LoginPage } from './../login/login';
import { FrontPage } from './../front/front';
import { UploadService } from './../../providers/upload-service';
import { Component } from '@angular/core';
import { NavController, ActionSheetController, Platform } from 'ionic-angular';
import { Camera } from 'ionic-native';

/*
  Generated class for the Upload page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/

@Component({
  selector: 'page-upload',
  templateUrl: 'upload.html'
})
export class UploadPage {

  public base64Image: string;
  private username: any;
  private beerRating:any;
  public video: string;

  constructor(public navCtrl: NavController, public actionSheetCtrl: ActionSheetController, public uploadService: UploadService,
  public platform: Platform) { }

  ionViewDidLoad() {
    this.getUserName();
  }

  uploadPost = (event: any, value: any) => {

    event.preventDefault();

    const fileElement = event.target.querySelector('input[type=file]');
    const file = fileElement.files[0];

    const formData = new FormData();

    if (this.base64Image) {
      formData.append('file', this.dataURItoBlob(this.base64Image));
    } else {
      formData.append('file', file);
    }
    formData.append('title', value.title);
    formData.append('description', value.description);

    this.uploadService.upload(formData, this.beerRating).subscribe(
      resp => {
        this.navCtrl.setRoot(FrontPage);
      }
    );

  }

  public presentActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Select Image Source',
      buttons: [
        {
          text: 'Load from Gallery',
          handler: () => {
            this.chooseFromGallery();
          }
        },
        {
          text: 'Use Camera',
          handler: () => {
            this.takePicture();
          }
        },
        {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    });
    actionSheet.present();
  }

  //choose picture from mobile device photolibrary
  chooseFromGallery() {
    Camera.getPicture({
      sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
      destinationType: Camera.DestinationType.DATA_URL,
      quality: 100,
      allowEdit: true,
      targetHeight: 1000,
      targetWidth: 1000
    }).then((imageData) => {
      // imageData is a base64 encoded string
      this.base64Image = "data:image/jpeg;base64," + imageData;
    }, (err) => {
      console.log(err);
    });
  }

  //take picture with camera
  takePicture() {
    Camera.getPicture({
      destinationType: Camera.DestinationType.DATA_URL,
      quality: 100,
      allowEdit: true,
      targetWidth: 1000,
      targetHeight: 1000
    }).then((imageData) => {
      // imageData is a base64 encoded string
      this.base64Image = "data:image/jpeg;base64," + imageData;

    }, (err) => {
      console.log(err);
    });
  }

  getUserName = () => {
    if (localStorage.getItem('user')) {
      this.username = JSON.parse(localStorage.getItem("user")).username;
    } else {
      this.navCtrl.setRoot(LoginPage);
    }
  }

  changeValue = (event) => {
    this.beerRating = event.value;
  }

  dataURItoBlob = (dataURI: any) => {
    'use strict'
    var byteString,
      mimestring

    if (dataURI.split(',')[0].indexOf('base64') !== -1) {
      byteString = atob(dataURI.split(',')[1])
    } else {
      byteString = decodeURI(dataURI.split(',')[1])
    }

    mimestring = dataURI.split(',')[0].split(':')[1].split(';')[0]

    var content = new Array();
    for (var i = 0; i < byteString.length; i++) {
      content[i] = byteString.charCodeAt(i)
    }

    return new Blob([new Uint8Array(content)], { type: mimestring });
  }
}


