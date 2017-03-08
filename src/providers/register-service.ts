import { LoginService } from './login-service';
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';

@Injectable()
export class RegisterService {

  private url: String = 'http://media.mw.metropolia.fi/wbma';

  private user: any = {};

  constructor(private http: Http, private loginService: LoginService) { }

  /*Gets values from register.ts.*/
  setUser = (user) => {
    this.user = user;
  }

  /*Sends user information to API and returns the response*/
  register = () => {
    return this.http.post(this.url + '/users', this.user)
      .map(
      resp => {
        return resp;
      }, error => {
        return error;
      });
  }
}
