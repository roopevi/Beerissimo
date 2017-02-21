import { UploadService } from './../../providers/upload-service';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

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

  ionViewDidLoad() {
    console.log('ionViewDidLoad UploadPage');
  }

}
