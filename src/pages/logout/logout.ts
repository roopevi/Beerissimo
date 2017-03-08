import { LoginPage } from './../login/login';
import { FrontPage } from './../front/front';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/*
  Generated class for the Logout page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-logout',
  templateUrl: 'logout.html'
})
export class LogoutPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('filename');
    this.switchToMenu();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LogoutPage');
    this.logout();
  }

  switchToMenu = () => {
    this.navCtrl.setRoot(LoginPage);
  }



}
