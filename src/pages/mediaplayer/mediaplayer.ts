import { LoginPage } from './../login/login';
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
  private myUserName: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public mediaService: MediaService) {
    this.firstParam = navParams.get('firstPassed');
  }

  ionViewDidLoad() {
    this.getUserName();
    this.thisPostLiked = false;
    console.log('ionViewDidLoad MediaplayerPage');
    this.viewPost(this.firstParam);
    this.showComments();
  }

  getName(user: any) {
    this.mediaService.getOwner(user).subscribe(
      resp => {
        this.user = resp;
        console.log(resp);
      }
    );
  }

  viewPost = (fileId) => {
    this.mediaService.getSingleMedia(fileId).subscribe(
      res => {
        this.mediaFile = res;
        this.getName(this.mediaFile.user_id);
        this.getFileFavourites(fileId);
      }
    );
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
    this.commentCredentials.file_id = this.firstParam;
    this.commentCredentials.comment = value.comment;
    this.mediaService.postComment(this.commentCredentials).subscribe (
      res => {
        console.log(res);
        this.showComments();
        this.onSubmit();
      },
      error => {
        console.log(error);
      }
    );
  }

  showComments = () => {
    this.mediaService.getComment(this.firstParam).subscribe(
      res => {
        console.log(res);
        this.comments = res;
        this.getUserToComment();
      }
    );
  }


  getUserName = () => {
    if (localStorage.getItem('user')) {
      this.myUserName = JSON.parse(localStorage.getItem("user")).username;
      console.log('näkyyks tää');
    }
    else {
      this.navCtrl.setRoot(LoginPage);
    }
  }

  getUserToComment = () => {
    for (let user of this.comments) {
      this.mediaService.getOwner(user.user_id).subscribe(
        res => {
          for (let i in this.comments) {
            if (this.comments[i].user_id == res.user_id) {
              this.comments[i].username = res.username;
            }
          }
        }
      )
    }
  }

  onSubmit (): void {
    this.commentCredentials.comment = '';
  }

}
