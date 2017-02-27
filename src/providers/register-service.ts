import { LoginService } from './login-service';
import { Router } from '@angular/router';
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';

@Injectable()
export class RegisterService {

  private url: String = 'http://media.mw.metropolia.fi/wbma';

  private user: any = {};

  constructor(private http: Http, private loginService: LoginService) { }

  setUser = (user) => {
    this.user = user;
    console.log(this.user);
  }

  register = () => {
    return this.http.post(this.url + '/users', this.user)
      .map(
      resp => {
        const originalData = this.user;
        const dataFromServer = resp.json();

        this.user = dataFromServer;
        // convert user object to string and save userdata to local storage
        delete originalData['email'];

        this.loginService.setUser(originalData);
        this.loginService.login();
      }
      );
  }

}
