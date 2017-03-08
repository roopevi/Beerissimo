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

  constructor(public navCtrl: NavController, public navParams: NavParams, private http: Http, private mediaService: MediaService, private loginService: LoginService) { }


  ionViewWillEnter() {
    if (localStorage.getItem('user')) {
      this.getAllMedia();
      this.getUserName();
    } else {
      this.navCtrl.setRoot(LoginPage);
    }
  }

  getAllMedia = () => {
    this.mediaService.getMedia().subscribe(
      res => {
        this.mediaFiles = res;
        this.mediaFiles.reverse();

        if (this.mediaFiles != null) {
          this.getUserToPost();
          //this.getAmountOfComments();
        }

        this.mediaFiles = this.mediaFiles.filter(function (element) {
          if (element.title.trim() != '' || element.description.trim() != '') {
            return element;
          }
        });
      }
    )
  };

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

  getAmountOfComments = () => {
    for (let file of this.mediaFiles) {
      this.mediaService.getComment(file.file_id).subscribe(
        res => {
          this.amountOfComments = res.length;
          console.log(this.amountOfComments);
        }
      )
    }
  }

  getUserName = () => {
    if (localStorage.getItem('user')) {
      this.myUserName = JSON.parse(localStorage.getItem("user")).username;
    }
    else {
      this.navCtrl.setRoot(LoginPage);
    }
  }


  openPost = (fileId) => {
    this.navCtrl.push(MediaplayerPage, {
      firstPassed: fileId,
    });
  }
}


