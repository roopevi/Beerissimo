import { LoginService } from './../../providers/login-service';
import { FrontPage } from './../front/front';
import { RegisterService } from './../../providers/register-service';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

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

  constructor(public navCtrl: NavController, public navParams: NavParams, private registerService: RegisterService, private loginService: LoginService) { }

  private email: string = '';
  private username: string = '';
  private password: string = '';
  private response: any;
  private errorMessage: any = 'Login failed';
  private loginFailed: boolean = false;

  switchToMenu = () => {
    this.navCtrl.setRoot(FrontPage);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
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

        console.log(user, resp);

        // convert user object to string and save userdata to local storage
        delete originalData['email'];
        console.log(originalData);
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
