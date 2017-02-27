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
  private allUsers: any = {};
  private cart: any = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, private http: Http, private mediaService: MediaService, private loginService: LoginService) { }


  
  ionViewWillEnter() {
        this.getUserName();
        this.getAllMedia();
    console.log(this.cart);
  }

  
 
  

  getAllMedia = () => {
    this.mediaService.getMedia().subscribe(
      res => {
        this.mediaFiles = res;
        this.mediaFiles.reverse();
        // for (const key in this.mediaFiles) {
        //   const obj = this.mediaFiles[key];
        //   for (const prop in obj) {

        //     if (prop == 'user_id') {
        //       this.userData = this.getOwner(obj[prop]);
        //     }
        //   }
        // }
      }
    )
  };

  inserOwner = (userId: any, userName: any) => {
    this.allUsers.id = userId;
    this.allUsers.username = userName;

    this.cart.push(this.allUsers);
  }

  getOwner = (userId: any) => {
    this.mediaService.getOwner(userId).subscribe(
      res => {
        const dataFromServer = res;
        const username = dataFromServer.username
        const userId = dataFromServer.user_id

        this.inserOwner(userId, username)

      }
    );
  }

  getUserName = () => {
    if (localStorage.getItem('user')) {
      this.myUserName = JSON.parse(localStorage.getItem("user")).username;
    }
  }
  


}
