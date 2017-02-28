import { LoginPage } from './../login/login';
import { MediaService } from './../../providers/media-service';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

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

  constructor(public navCtrl: NavController, public navParams: NavParams, private mediaService: MediaService) { }

  ionViewDidLoad() {
    this.getUserName();
    this.getGrade();
    this.userId = JSON.parse(localStorage.getItem("user")).user_id;
    this.getPostsByUser(this.userId);
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

        console.log(this.mediaFiles.length);
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

  getGrade = () => {
    if (localStorage.getItem('user')) {
      this.grade = JSON.parse(localStorage.getItem("user")).full_name;
    } else {
      this.grade = 'not defined';
    }
  }


}
