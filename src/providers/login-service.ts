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
  private token: string = '';

  constructor(public http: Http) {
    console.log('Hello LoginService Provider');
  }

  setUser = (user) => {
    this.user = user;
    console.log(this.user);
  }

  login = () => {
    return this.http.post(this.url + '/login', this.user)
     .subscribe(
       resp => {
         console.log(resp.json());
         // convert user object to string and save userdata to local storage
         this.user = resp.json().user;
         this.user.token = resp.json().token;
         localStorage.setItem('user', JSON.stringify(this.user));
         // navigate to front

       },
       error => {
         console.log(error);
       }
     );
  }
}
