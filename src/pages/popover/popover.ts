import { MediaService } from './../../providers/media-service';
import { Camera } from 'ionic-native';
import { ProfilepicService } from './../../providers/profilepic-service';
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

  constructor(public events: Events, public navCtrl: NavController, public actionSheetCtrl: ActionSheetController, public navParams: NavParams, public viewCtrl: ViewController, private profilepicService: ProfilepicService, public mediaService: MediaService) { }

  ionViewDidLoad() {
  }

  /*Close Popover page*/
  close() {
    this.viewCtrl.dismiss();
  }

  /*Open the image source menu when "Choose file" is clicked*/
  public presentActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Select Image Source',
      buttons: [
        {
          /*Run following function when text below ie pressed*/
          text: 'Load from Gallery',
          handler: () => {
            this.chooseFromGallery();
          }
        },
        {
          /*Run following function when text below ie pressed*/
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

  /*Function runs when "Post" is pressed*/
  changeProfilePic = (event: any) => {

     // event.preventDefault();

    /*Sets chosen file to a variable*/
    const fileElement = event.target.querySelector('input[type=file]');
    const file = fileElement.files[0];

    /*Create object formData*/
    const formData = new FormData();

    if (this.base64Image) {
      formData.append('file', this.dataURItoBlob(this.base64Image));
    } else {
      formData.append('file', file);
    }

    /*Sends formData to profilepicService's changeProfilePic function as a parameter*/
    this.profilepicService.changeProfilePic(formData).subscribe(
      resp => {

        /*Gets file_id as a response and sets it to a variable*/
        const file_id = resp;

        /*Sends file_id to mediaService's getSingleMedia function as a parameter*/
        this.mediaService.getSingleMedia(file_id).subscribe(
          resp => {

            /*Gets the filename of the response and sets it to a variable*/
            this.profilepicfilename = resp.filename;

            /*Sets filename to local storage so we can use it in profile page*/
            localStorage.setItem('filename', JSON.stringify('http://media.mw.metropolia.fi/wbma/uploads/' + this.profilepicfilename));

            /*closes Popover page*/
            this.viewCtrl.dismiss();


            this.events.publish('pic:changed');
          }
        );
      }
    );
  }

  submitProfilePic = (event: any) => {

  }

}
