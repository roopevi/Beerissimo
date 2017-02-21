import { UploadService } from './../../providers/upload-service';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
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

  private file: File;
  private title: string = '';
  private description: string = '';
  public base64Image: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public uploadService: UploadService) {}

  uploadPost = (event: any, value: any) => {
    const fileElement = event.target.querySelector('input[type=file]');
    const file = fileElement.files[0];

    const formData = new FormData();
    formData.append('file', file);
    formData.append('title', value.title);
    formData.append('description', value.description);

    this.uploadService.upload(formData).subscribe(data => {
      console.log(data);
    });


  }

  takePicture() {
    Camera.getPicture({
      destinationType: Camera.DestinationType.DATA_URL,
      targetWidth: 1000,
      targetHeight: 1000
    }).then((imageData) => {
      this.base64Image = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
      console.log(err);
    });
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad UploadPage');
  }

}
