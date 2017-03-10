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


  private profilePics: any[];
  private username: any;
  public mediaFiles: any[];
  private userId: any;
  private fileName: any;

  constructor(public events: Events, public navCtrl: NavController, public navParams: NavParams, private mediaService: MediaService, public profilepicService: ProfilepicService, public popoverCtrl: PopoverController) {
    /*Runs getProfilePic function after pic changed event is published in profilepic-service.ts.
    The usage of this event guarantees auto update of the profile page.*/
    events.subscribe('pic:changed', () => {
      this.getProfilePic();
    });
  }

  /*On view load, get username and get all posts made by user*/
  ionViewDidLoad() {
    this.getUserName();
    this.userId = JSON.parse(localStorage.getItem("user")).user_id;
    this.getPostsByUser(this.userId);
  }

  /*On enter, get profile pic*/
  ionViewWillEnter() {
    this.getProfilePic();
  }
  /*Create and present Popover page when picture is clicked*/
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

  /*Get username from local storage. If not exists, navigate to LoginPage*/
  getUserName = () => {
    if (localStorage.getItem('user')) {
      this.username = JSON.parse(localStorage.getItem("user")).username;
    } else {
      this.navCtrl.setRoot(LoginPage);
    }
  }

  /*Get the filename of the profile picture from local storage*/
  getProfilePic = () => {

    /*Get the filename of the profile picture from local storage. Filename is linked to the image in html template*/
    if (localStorage.getItem('filename')) {
      this.fileName = JSON.parse(localStorage.getItem('filename'));
    }
    /*If filename doesn't exist in local storage, this will run*/
    else {

      /*Gets a response as an array of getPicFromApi -function in profilepicService*/
      this.profilepicService.getPicFromApi().subscribe(
        res => {

          /*Set response to a variable*/
          this.profilePics = res;

          /*Flip the order of the array to get the newest file first*/
          this.profilePics.reverse();

          /*Get the file from local storage filtered by user_id*/
          this.profilePics = this.profilePics.filter(function (element) {
            if (element.user_id === JSON.parse(localStorage.getItem('user')).user_id) {
              return element;

            }

          });


          /*If profilePics contains file(s) choose the newest one and set it to local storage*/
          if (this.profilePics.length > 0) {
            this.fileName = this.profilePics[0].filename;
            localStorage.setItem('filename', JSON.stringify('http://media.mw.metropolia.fi/wbma/uploads/' + this.fileName));

            /*Set the filename of the image to fileName variable*/
            this.fileName = JSON.parse(localStorage.getItem('filename'));
          }

        }

      )

    }

  }

  /*On click open MediaplayerPage with id*/
  openPost = (fileId) => {
    this.navCtrl.push(MediaplayerPage, {
      firstPassed: fileId,
    });
  }
}
