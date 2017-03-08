import { LoginService } from './login-service';
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';

@Injectable()
export class RegisterService {

  private url: String = 'http://media.mw.metropolia.fi/wbma';

  private user: any = {};

  constructor(private http: Http, private loginService: LoginService) { }

  setUser = (user) => {
    this.user = user;
  }

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
