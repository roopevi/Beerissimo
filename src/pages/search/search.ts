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

  items: any[];
  private mediaFiles: any[];
  private myUserName: any;


  constructor(public navCtrl: NavController, public navParams: NavParams, private mediaService: MediaService) {
    this.getMedia();
    this.initializeItems()
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchPage');
  }

  initializeItems() {

    if (this.mediaFiles) {

      this.items = this.mediaFiles.filter(function (element) {
        return element.title.length > 0;
      });

    }
  }


  getMedia = () => {
    this.mediaService.getMedia().subscribe(
      res => {
        this.mediaFiles = res;
      }
    )
  }


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

  getUserName = () => {
    if (localStorage.getItem('user')) {
      this.myUserName = JSON.parse(localStorage.getItem("user")).username;
    } else {
      this.myUserName = 'user';
    }
  }

}
