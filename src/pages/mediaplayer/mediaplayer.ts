import { MediaService } from './../../providers/media-service';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/*
  Generated class for the Mediaplayer page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-mediaplayer',
  templateUrl: 'mediaplayer.html'
})
export class MediaplayerPage {

  private mediaFile: any = [];
  private user: any = [];
  public firstParam: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public mediaService: MediaService) {
    this.firstParam = navParams.get('firstPassed');
  }

  ionViewDidLoad() {

    console.log(this.firstParam);
    console.log('ionViewDidLoad MediaplayerPage');
    this.viewPost(this.firstParam);
  }

  getName (user: any) {
    this.mediaService.getOwner(user).subscribe (
      resp => {
        this.user = resp;
        console.log(resp);
      }
    )
  }

  viewPost = (fileId) => {
    this.mediaService.getSingleMedia(fileId).subscribe (
      res => {
        this.mediaFile = res;
        this.getName(this.mediaFile.user_id);
      }
    )
  }

}
