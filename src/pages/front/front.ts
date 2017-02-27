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
  private userData: any = {};


  constructor(public navCtrl: NavController, public navParams: NavParams, private http: Http, private mediaService: MediaService, private loginService: LoginService) {}

  ionViewDidLoad() {
    this.getUserName();
    this.getAllMedia();
  }

  getAllMedia = () => {
    this.mediaService.getMedia().subscribe(
      res => {
        this.mediaFiles = res;
        this.mediaFiles.reverse();
      }
    )
  };

  getOwner = (userId: any) => {
    this.mediaService.getOwner(userId).subscribe(
      res => {
        this.userData = res.filter(function(element){
          this.username = element.username;
          return this.username;
        });

      }
    );
  }


  getUserName = () => {
    if (localStorage.getItem('user')) {
      this.myUserName = JSON.parse(localStorage.getItem("user")).username;
    } else {
      this.myUserName = 'user';
    }
  }


}
