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
  public buttonText: string;
  private favourites = 0;
  private comments: any = [];
  private commentCredentials = { file_id: '', comment: '' };
  private myUserName: any;
  private rating: any = 0;

  constructor(public navCtrl: NavController, public navParams: NavParams, public mediaService: MediaService) {
    this.firstParam = navParams.get('firstPassed');
  }

  /*On view load, get username, load post and show comments*/
  ionViewDidLoad() {
    this.getUserName();
    this.thisPostLiked = false;
    this.viewPost(this.firstParam);
    this.showComments();
  }

  /*Get username by user id*/
  getName = (userId: any) => {
    this.mediaService.getOwner(userId).subscribe(
      resp => {
        this.user = resp;
      }
    );
  }

  /*Get beer rating by file id*/
  getRating = (fileId) => {
    this.mediaService.getFileRating(fileId).subscribe(
      resp => {
        if (resp[0]) {
          this.rating = resp[0].rating;
        }
      }
    )
  }

  /*View media by filed id. Get name of posts creator, favourites and rating*/
  viewPost = (fileId) => {
    this.mediaService.getSingleMedia(fileId).subscribe(
      res => {
        this.mediaFile = res;
        this.getName(this.mediaFile.user_id);
        this.getFileFavourites(fileId);
        this.getRating(fileId);
      }
    );
  }

  /*Get favourites by file id. Set like button to true or false according if post have been liked by user*/
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

  /*On click add file by file id to favourites. Load view again*/
  addFavourite = (fileId) => {
    this.mediaService.addToFavourites(fileId).subscribe(
      res => {
        this.ionViewDidLoad();
      }
    );
  }

  /*On click delete file by file id from favourites. Load view again*/
  deleteFavourite = (fileId) => {
    this.mediaService.deleteFromFavourites(fileId).subscribe(
      res => {
        this.ionViewDidLoad();
      });
  }

  /*Build new comment and post according to file id. On submit load comments again*/
  makeComment = (value: any) => {
    this.commentCredentials.file_id = this.firstParam;
    this.commentCredentials.comment = value.comment;
    this.mediaService.postComment(this.commentCredentials).subscribe(
      res => {
        this.showComments();
        this.onSubmit();
      }
    );
  }

  /*Load comments according to file id*/
  showComments = () => {
    this.mediaService.getComment(this.firstParam).subscribe(
      res => {
        this.comments = res;
        this.getUserToComment();
      }
    );
  }

  /*Get username from local storage. If does not exist, navigate to login.*/
  getUserName = () => {
    if (localStorage.getItem('user')) {
      this.myUserName = JSON.parse(localStorage.getItem("user")).username;
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

  /*Reset comment credentials*/
  onSubmit(): void {
    this.commentCredentials.comment = '';
  }

}
