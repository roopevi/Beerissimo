import { LoginPage } from './../login/login';
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

  constructor(public navCtrl: NavController, public navParams: NavParams) { }
  /*On view load, run logout function*/
  ionViewDidLoad() {
    this.logout();
  }

  /*Remove user object fron local storage and navigate to LoginPage*/
  logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('filename');
    this.switchToMenu();
  }

  /*Navigate to LoginPage*/
  switchToMenu = () => {
    this.navCtrl.setRoot(LoginPage);
  }
}
