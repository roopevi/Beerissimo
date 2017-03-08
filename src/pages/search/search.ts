import { LoginPage } from './../login/login';
import { MediaplayerPage } from './../mediaplayer/mediaplayer';
import { MediaService } from './../../providers/media-service';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/*
  Generated class for the Search page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-search',
  templateUrl: 'search.html'
})
export class SearchPage {

  public items: any[];
  private mediaFiles: any[];
  private myUserName: any;

  /*On constructor, get all media, create reference of media files*/
  constructor(public navCtrl: NavController, public navParams: NavParams, private mediaService: MediaService) {
    this.getMedia();
    this.initializeItems()
  }
  /*On view load, get username*/
  ionViewDidLoad() {
    this.getUserName();
  }
  /*Create reference of media files and filter out empty results.*/
  initializeItems() {

    if (this.mediaFiles) {
      this.items = this.mediaFiles.filter(function (element) {
        return element.title.length > 0;
      });
    }
  }

  /*Get all media files*/
  getMedia = () => {
    this.mediaService.getMedia().subscribe(
      res => {
        this.mediaFiles = res;
      }
    )
  }

  /*On search, get media files and filter out empty results. Display results below search bar. If no results, don't do anything.*/
  getItems(ev: any) {
    // Reset items back to all of the items

    // set val to the value of the searchbar
    let val = ev.target.value;

    this.getMedia();
    this.initializeItems();

    // if the value is an empty string don't filter the items
    if (val && val.trim().length > 0) {
      this.items = this.items.filter((item) => {
        return (item.title.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    } else {
      this.items = [];
    }
  }

  /*Get username from local storage. If not exists, navigate to LoginPage*/
  getUserName = () => {
    if (localStorage.getItem('user')) {
      this.myUserName = JSON.parse(localStorage.getItem("user")).username;
    } else {
      this.navCtrl.setRoot(LoginPage);
    }
  }

  /*On click open MediaplayerPage with id*/
  openPost = (fileId) => {
    this.navCtrl.push(MediaplayerPage, {
      firstPassed: fileId,
    });
  }

}
