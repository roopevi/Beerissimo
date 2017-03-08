import { LoginPage } from './../login/login';
import { LoginService } from './../../providers/login-service';
import { FrontPage } from './../front/front';
import { RegisterService } from './../../providers/register-service';
import { Component } from '@angular/core';
import { NavController, NavParams, MenuController } from 'ionic-angular';

/*
  Generated class for the Register page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-register',
  templateUrl: 'register.html'
})
export class RegisterPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private registerService: RegisterService, private loginService: LoginService, private menu: MenuController) {
    this.menu.swipeEnable(false, 'menu');
  }

  private loginFailed: boolean = false;

  /*Navigate to FrontPage*/ 
  switchToMenu = () => {
    this.menu.swipeEnable(true, 'menu');
    this.navCtrl.setRoot(FrontPage);
  }

  /*Navigate to LoginPage*/
  toLoginPage = () => {
    this.navCtrl.setRoot(LoginPage);
  }

  /*Registeration function, takes values from form as a parameter*/
  register = (value) => {

    /*Create reference to user*/
    const user = {
      username: value.username,
      password: value.password,
      email: value.email
    };

    /*Create user object in RegisterService*/
    this.registerService.setUser(user);

    /*Registeration function. On success navigate to FrontPage. On error show error message*/
    this.registerService.register().subscribe(
      resp => {

        /*Automatic login function after registeration. Email is deleted because it's not required in login*/
        const originalData = user;
        delete originalData['email'];
        this.loginService.setUser(originalData);
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
    );

    this.switchToMenu();

  }
}
