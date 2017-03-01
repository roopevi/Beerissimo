import { LoginPage } from './../login/login';
import { LoginService } from './../../providers/login-service';
import { FrontPage } from './../front/front';
import { UploadService } from './../../providers/upload-service';
import { Component } from '@angular/core';
import { NavController, NavParams, ActionSheetController } from 'ionic-angular';
import { Camera, File } from 'ionic-native';

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

  private file: File;
  private title: string = '';
  private description: string = '';
  public base64Image: string;
  private username: any;

  constructor(public navCtrl: NavController, public actionSheetCtrl: ActionSheetController, public uploadService: UploadService) { }

  ionViewDidLoad() {
    this.getUserName();
    console.log('ionViewDidLoad UploadPage');
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

    this.uploadService.upload(formData).subscribe(
      resp => {
        console.log(resp);
      }, error => {
        console.log(error);
      }
    );

  }

  takePicture() {
    Camera.getPicture({
      destinationType: Camera.DestinationType.DATA_URL,
      quality: 100,
      allowEdit: true,
      targetWidth: 800,
      targetHeight: 800
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



  dataURItoBlob = (dataURI:any) => {
    'use strict'
    var byteString,
        mimestring

    if(dataURI.split(',')[0].indexOf('base64') !== -1 ) {
        byteString = atob(dataURI.split(',')[1])
    } else {
        byteString = decodeURI(dataURI.split(',')[1])
    }

    mimestring = dataURI.split(',')[0].split(':')[1].split(';')[0]

    var content = new Array();
    for (var i = 0; i < byteString.length; i++) {
        content[i] = byteString.charCodeAt(i)
    }

    return new Blob([new Uint8Array(content)], {type: mimestring});
}

}
