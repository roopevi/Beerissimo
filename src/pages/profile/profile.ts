import { PopoverPage } from './../popover/popover';
import { ProfilepicService } from './../../providers/profilepic-service';
import { MediaplayerPage } from './../mediaplayer/mediaplayer';
import { LoginPage } from './../login/login';
import { MediaService } from './../../providers/media-service';
import { Component } from '@angular/core';
import { NavController, NavParams, PopoverController, Events } from 'ionic-angular';


/*
  Generated class for the Profile page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html'
})
export class ProfilePage {

  private username: any;
  private grade: any;
  public mediaFiles: any[];
  private userId: any;
  private fileName: any;

  constructor(public events: Events, public navCtrl: NavController, public navParams: NavParams, private mediaService: MediaService, public profilepicService: ProfilepicService, public popoverCtrl: PopoverController) {
    events.subscribe('pic:changed', () => {
      this.getProfilePic();
    });
  }

  ionViewDidLoad() {
    this.getUserName();
    this.getGrade();
    this.userId = JSON.parse(localStorage.getItem("user")).user_id;
    this.getPostsByUser(this.userId);


  }
  ionViewWillEnter() {
    this.getProfilePic();
  }
  ionPageDidEnter() {

  }

  presentPopover(myEvent) {
    let popover = this.popoverCtrl.create(PopoverPage);
    popover.present({
      ev: myEvent
    });
  }

  getPostsByUser = (userId) => {
    this.mediaService.getMedia().subscribe(
      res => {
        this.mediaFiles = res;
        this.mediaFiles.reverse();

        this.mediaFiles = this.mediaFiles.filter(function (element) {
          if (element.title.trim() != '' || element.description.trim() != '') {
            return element.user_id == userId;
          }
        });
      }
    )
  }

  getUserName = () => {
    if (localStorage.getItem('user')) {
      this.username = JSON.parse(localStorage.getItem("user")).username;
    } else {
      this.navCtrl.setRoot(LoginPage);
    }
  }

  getProfilePic = () => {

    if (localStorage.getItem('filename')) {
      this.fileName = JSON.parse(localStorage.getItem('filename'));
      console.log(this.fileName);

    }
    else {
      this.fileName = "http://media.mw.metropolia.fi/wbma/uploads/03642ac1c39f45beb0480714727be0a7.png";
    }

  }

  getGrade = () => {
    if (localStorage.getItem('user')) {
      this.grade = JSON.parse(localStorage.getItem("user")).full_name;
    } else {
      this.grade = 'not defined';
    }
  }

  openPost = (fileId) => {
    this.navCtrl.push(MediaplayerPage, {
      firstPassed: fileId,
    });
  }
}
