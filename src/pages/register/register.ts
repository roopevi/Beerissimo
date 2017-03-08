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

  switchToMenu = () => {
    this.menu.swipeEnable(true, 'menu');
    this.navCtrl.setRoot(FrontPage);
  }

  toLoginPage = () => {
    this.navCtrl.setRoot(LoginPage);
  }

  ionViewDidLoad() {
  }

  register = (value) => {
    const user = {
      username: value.username,
      password: value.password,
      email: value.email
    };
    this.registerService.setUser(user);
    this.registerService.register().subscribe(
      resp => {
        const originalData = user;

        // convert user object to string and save userdata to local storage
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
