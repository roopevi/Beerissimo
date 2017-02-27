import { FrontPage } from './../front/front';
import { LoginService } from './../../providers/login-service';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/*
  Generated class for the Login page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {



  constructor(public navCtrl: NavController, public navParams: NavParams, private loginService: LoginService) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  ionViewWillEnter() {
  
  }
  
  

  private username1: string = '';
  private password1: string = '';


switchToMenu = () => {
  this.navCtrl.setRoot(FrontPage);
}

    switchToMenu2 = (user) => {
    this.navCtrl.setRoot(FrontPage,user);

    
  }

login = () => {
    const user = {
      username: this.username1,
      password: this.password1
    };
    this.loginService.setUser(user);
    this.loginService.login();
    this.switchToMenu2(user.username);
  }

  logout = () => {
    localStorage.removeItem('user');
    this.switchToMenu();
  }

}
