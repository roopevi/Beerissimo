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
  private thisPostLiked: boolean;
  buttonText: string;
  private favourites = 0;
  private comments: any = [];
  private commentCredentials = { file_id: '', comment: '' };

  constructor(public navCtrl: NavController, public navParams: NavParams, public mediaService: MediaService) {
    this.firstParam = navParams.get('firstPassed');
  }

  ionViewDidLoad() {
    this.thisPostLiked = false;
    console.log('ionViewDidLoad MediaplayerPage');
    this.viewPost(this.firstParam);
  }

  getName(user: any) {
    this.mediaService.getOwner(user).subscribe(
      resp => {
        this.user = resp;
        console.log(resp);
      }
    )
  }

  viewPost = (fileId) => {
    this.mediaService.getSingleMedia(fileId).subscribe(
      res => {
        this.mediaFile = res;
        this.getName(this.mediaFile.user_id);
        this.getFileFavourites(fileId);
      }
    )
  }

  getFileFavourites = (fileId) => {

    this.mediaService.getFavourites(fileId).subscribe(
      res => {
        this.favourites = res.length;
        for (const key in res) {
          const obj = res[key];
          for (const prop in obj) {
            if (prop === 'user_id') {
              if (obj[prop] === JSON.parse(localStorage.getItem("user")).user_id) {
                this.thisPostLiked = true;
                this.buttonText = 'Unlike';
              }
              this.buttonText = 'Like';
            }
          }
        }
      }
    );
  }

  addFavourite = (fileId) => {
    this.mediaService.addToFavourites(fileId).subscribe(
      res => {
        this.ionViewDidLoad();
      }
    );
  }

  deleteFavourite = (fileId) => {
    this.mediaService.deleteFromFavourites(fileId).subscribe(
      res => {
        this.ionViewDidLoad();
      });
  }

  makeComment = (value: any) => {
    console.log(value.comment);
    this.commentCredentials.file_id = this.firstParam;
    console.log(this.commentCredentials.file_id);
    this.commentCredentials.comment = value.comment;
    console.log(this.commentCredentials);
    this.mediaService.postComment(this.commentCredentials).subscribe (
      res => {
        console.log(res);
      },
      error => {
        console.log(error);
      }
    )
  }

  showComment = (fileId) => {
    this.mediaService.getComment(fileId).subscribe(
      res => {
        this.comments = res;
        console.log(res);
      }
    )
  }



}
