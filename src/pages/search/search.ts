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

  searchQuery: string = '';
  items: string[];
  private mediaFiles: any[];

  constructor(public navCtrl: NavController, public navParams: NavParams, private mediaService: MediaService) {
    this.getMedia();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchPage');
  }

  initializeItems() {
    this.items = [];

    for (const key in this.mediaFiles) {
      const obj = this.mediaFiles[key];
      for (const prop in obj) {

        if (prop == 'title') {

          if (obj[prop].length > 0 || !(this.items.indexOf(obj[prop]) >= 0)) {
            this.items.push(obj[prop].trim());
          }
        }
      }
    }

  }


  getMedia = () => {
    this.mediaService.getMedia().subscribe(
      res => {
        this.mediaFiles = res;
        this.initializeItems();
      }
    )
  }


  getItems(ev: any) {
    // Reset items back to all of the items
    this.initializeItems();

    // set val to the value of the searchbar
    let val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.items = this.items.filter((item) => {
        return (item.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }

}
