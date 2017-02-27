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

  constructor(public navCtrl: NavController, public navParams: NavParams, private registerService: RegisterService) {}

  private email: string = '';
  private username: string = '';
  private password: string = '';
  private response: any;

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
      res => {
        this.response = res;
        console.log(this.response);
        
      }
    );
    //this.switchToMenu();
    this.navCtrl.setRoot(FrontPage);
  }

}
