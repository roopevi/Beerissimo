import { RegisterPage } from './../register/register';
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

  private loginFailed: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, private loginService: LoginService) { }

  /*Navigate to FrontPage*/
  switchToMenu = () => {
    this.navCtrl.setRoot(FrontPage);
  }

  /*Navigate to RegisterPage*/
  toRegisterPage = () => {
    this.navCtrl.setRoot(RegisterPage);
  }

  /*Login function, takes values from login form as parameter*/
  login = (value) => {

    /*Create reference to user*/
    const user = {
      username: value.username,
      password: value.password
    };

    /*Create user object in LoginService*/
    this.loginService.setUser(user);

    /*Login function. On success navigate to FrontPage. On error show error message*/
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
}
