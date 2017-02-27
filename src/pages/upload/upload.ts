import { FrontPage } from './../front/front';
import { UploadService } from './../../providers/upload-service';
import { Component } from '@angular/core';
import { NavController, NavParams, ActionSheetController} from 'ionic-angular';
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

  constructor(public navCtrl: NavController,public actionSheetCtrl: ActionSheetController,public uploadService: UploadService) {}

  ionViewDidLoad() {
    this.getUserName();
    console.log('ionViewDidLoad UploadPage');
  }

  uploadPost = (event: any, value: any) => {
    const fileElement = event.target.querySelector('input[type=file]');
    const file = fileElement.files[0];

    const formData = new FormData();
    formData.append('file', file);
    formData.append('title', value.title);
    formData.append('description', value.description);

    this.uploadService.upload(formData).subscribe(data => {
      console.log(data);
      this.navCtrl.setRoot(FrontPage);
      
    });
    
  }

  takePicture(){
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
      this.username = 'user';
    }
  }


  /*public presentActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Select Image Source',
      buttons: [
        {
          text: 'Load from Device',
          handler: () => {
            this.takePicture(Camera.PictureSourceType.PHOTOLIBRARY);
          }
        },
        {
          text: 'Take a picture',
          handler: () => {
            this.takePicture(Camera.PictureSourceType.CAMERA);
          }
        },
        {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    });
    actionSheet.present();
  }*/

}
