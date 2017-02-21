import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from "@angular/http";
import 'rxjs/add/operator/map';

/*
  Generated class for the MediaService provider.
  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class MediaService {

  private url: string = 'http://media.mw.metropolia.fi/wbma';
  private token: any;

  constructor(public http: Http) {
    console.log('Hello MediaService Provider');
  }

  getMedia = () => {
    return this.http.get(this.url + '/tags/Beerissimo')
      .map(
      res =>
        res.json()
      );
  };

  getOwner = (userId: string) => {
    this.token = JSON.parse(localStorage.getItem("user")).token;


    return this.http.get(this.url + '/users/' + userId + '?token=' + this.token)
      .map(
      res =>
        res.json()
      );
  };

}
