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


  private errorMessage: any = 'Login failed';
  private loginFailed: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, private loginService: LoginService) { }


  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  switchToMenu = () => {
    this.navCtrl.setRoot(FrontPage);
  }


  login = (value) => {
    const user = {
      username: value.username,
      password: value.password
    };

    this.loginService.setUser(user);
    this.loginService.login().subscribe(
      res => {
        this.loginFailed = false;
        this.switchToMenu();
      },
      error => {
        const errorCode = error.status;
        if (errorCode === 401) {
          this.loginFailed = true;
        }
      }
    );


  }

  logout = () => {
    localStorage.removeItem('user');
    this.switchToMenu();
  }

}
