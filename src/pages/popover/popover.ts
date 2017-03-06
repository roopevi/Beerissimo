import { Camera } from 'ionic-native';
import { ProfilepicService } from './../../providers/profilepic-service';
import { ProfilePage } from './../profile/profile';
import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';

/*
  Generated class for the Popover page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-popover',
  templateUrl: 'popover.html'
})
export class PopoverPage {

  public base64Image: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, private profilepicService: ProfilepicService) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad PopoverPage');
  }

  close() {
    this.viewCtrl.dismiss();
  }

  chooseFile = () => {
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
  
  changeProfilePic = (event: any) => {
  
    event.preventDefault();

    const fileElement = event.target.querySelector('input[type=file]');
    const file = fileElement.files[0];

    const formData = new FormData();

    if (this.base64Image) {
      formData.append('file', this.dataURItoBlob(this.base64Image));
    } else {
      formData.append('file', file);
    }

    this.profilepicService.changeProfilePic(formData).subscribe(
      resp => {
        this.navCtrl.setRoot(ProfilePage);
      }
    );
  }

}
