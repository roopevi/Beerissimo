import { LoginPage } from './../login/login';
import { MediaplayerPage } from './../mediaplayer/mediaplayer';
import { LoginService } from './../../providers/login-service';
import { MediaService } from './../../providers/media-service';
import { Http } from '@angular/http';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/*
  Generated class for the Front page.
  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/

@Component({
  selector: 'page-front',
  templateUrl: 'front.html'
})
export class FrontPage {

  private mediaFiles: any[];
  private myUserName: any;
  private amountOfComments: any[];
  private amountOfLikes: any[];

  constructor(public navCtrl: NavController, public navParams: NavParams, private http: Http, private mediaService: MediaService, private loginService: LoginService) { }


  ionViewWillEnter() {
    /*If user object in login, load content. Otherwise navigate to login page*/
    if (localStorage.getItem('user')) {
      this.getAllMedia();
      this.getUserName();
    } else {
      this.navCtrl.setRoot(LoginPage);
    }
  }


  /*Refreshes the page by swiping from up to down*/
  doRefresh(refresher) {
      setTimeout(() => {
        refresher.complete();
      }, 2000);
  }


  /*Get all media with media service.*/

  getAllMedia = () => {
    this.mediaService.getMedia().subscribe(
      res => {
        this.mediaFiles = res;
        this.mediaFiles.reverse();

        /*If mediaFiles exist, get usernames for posts.*/
        if (this.mediaFiles != null) {
          this.getUserToPost();
          this.getAmountOfComments();
          this.getAmountOfLikes();
        }

        /*Filter out posts with empty titles or descriptions, if any exist.*/
        this.mediaFiles = this.mediaFiles.filter(function (element) {
          if (element.title.trim() != '' || element.description.trim() != '') {
            return element;
          }
        });
      }
    )
  };

  //Gets username for every post in front page
  getUserToPost = () => {
    for (let user of this.mediaFiles) {
      this.mediaService.getOwner(user.user_id).subscribe(
        res => {
          for (let i in this.mediaFiles) {
            if (this.mediaFiles[i].user_id == res.user_id) {
              this.mediaFiles[i].username = res.username;
            }
          }
        }
      )
    }
  }

  //Gets amount of comments for every post in front page
  getAmountOfComments = () => {
    for (let file of this.mediaFiles) {
      this.mediaService.getComment(file.file_id).subscribe(
        res => {
          this.amountOfComments = res.length;
          file.amountOfComments = this.amountOfComments;
        }
      )
    }
  }

  //gets amount of likes for every post in front page
  getAmountOfLikes = () => {
    for (let file of this.mediaFiles) {
      this.mediaService.getFavourites(file.file_id).subscribe(
        res => {
          this.amountOfLikes = res.length;
          file.amountOfLikes = this.amountOfLikes;
        });
    }
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

  /*Onclick navigate to MediaplayerPage*/
  openPost = (fileId) => {
    this.navCtrl.push(MediaplayerPage, {
      firstPassed: fileId,
    });
  }
}


