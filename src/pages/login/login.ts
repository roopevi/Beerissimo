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



  constructor(public navCtrl: NavController, public navParams: NavParams, private loginService: LoginService) { }


  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  ionViewWillEnter() {

  }




switchToMenu = () => {
  this.navCtrl.setRoot(FrontPage);
}


  login = (value) => {
    const user = {
      username: value.username,
      password: value.password
    };
    console.log(user);
    console.log(value);
    this.loginService.setUser(user);
    this.loginService.login().subscribe( res => {
      this.switchToMenu();
    });


  }

  logout = () => {
    localStorage.removeItem('user');
    this.switchToMenu();
  }

}
