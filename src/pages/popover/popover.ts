import { MediaService } from './../../providers/media-service';
import { Camera } from 'ionic-native';
import { ProfilepicService } from './../../providers/profilepic-service';
import { ProfilePage } from './../profile/profile';
import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, ActionSheetController, Events } from 'ionic-angular';

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
  private profilepicfilename: string;

  constructor(public events: Events, public navCtrl: NavController, public actionSheetCtrl: ActionSheetController, public navParams: NavParams, public viewCtrl: ViewController, private profilepicService: ProfilepicService, public mediaService: MediaService) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad PopoverPage');
  }

  close() {
    this.viewCtrl.dismiss();
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

  takePicture = () => {
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
  
    //event.preventDefault();

    const fileElement = event.target.querySelector('input[type=file]');
    console.log(fileElement);
    const file = fileElement.files[0];

    const formData = new FormData();

    if (this.base64Image) {
      formData.append('file', this.dataURItoBlob(this.base64Image));
    } else {
      formData.append('file', file);
    }
    console.log(formData);
    this.profilepicService.changeProfilePic(formData).subscribe(
      resp => {
        const file_id = resp;
        this.mediaService.getSingleMedia(file_id).subscribe(
          resp => {
            console.log(resp);
            this.profilepicfilename = resp.filename;
            console.log(this.profilepicfilename);
            localStorage.setItem('filename', JSON.stringify('http://media.mw.metropolia.fi/wbma/uploads/' + this.profilepicfilename));
            //this.profilepicService.getProfilePic(this.profilepicfilename);
            //this.navCtrl.setRoot(ProfilePage);
            this.viewCtrl.dismiss();
            this.events.publish('pic:changed');
          }
        );
        console.log(file_id);
        
      }
    );
  }

}
