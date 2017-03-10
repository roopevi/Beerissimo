import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the LoginService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class LoginService {


  private url: String = 'http://media.mw.metropolia.fi/wbma';

  private user: any = {};

  constructor(public http: Http) {
  }


  /*Gets user as parameter and sets user to login-service*/
  /*Set user object from parameter*/
  setUser = (user) => {
    this.user = user;
  }


  /*Is called from login.ts. Sends user object to API*/
  /*Return user object*/
  getUser () {
    return this.user;
  }

  /*Login function, makes post request to api and returns response*/
  login = () => {
    return this.http.post(this.url + '/login', this.user)
     .map(
       resp => {
         /*convert user object to string and save userdata to local storage*/
         this.user = resp.json().user;
         this.user.token = resp.json().token;
         localStorage.setItem('user', JSON.stringify(this.user));
         // navigate to front
         return resp;

       },
       error => {
         return error;
       }
     );
  }
}
