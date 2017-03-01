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

  private favouriteFile: any = {
    'file_id': null
  };

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

  getPostsByUser = (userId) => {
    this.token = JSON.parse(localStorage.getItem("user")).token;

    return this.http.get(this.url + '/media/user/' + userId + '?token=' + this.token)
      .map(
      res =>
        res.json()
      );
  }

  getSingleMedia = (fileId) => {
    return this.http.get(this.url + '/media/' + fileId).map(
      res =>
        res.json()
    );
  }


  getFavourites = (fileId) => {

    return this.http.get(this.url + '/favourites/file/' + fileId)
      .map(
      res =>
        res.json()
      );
  };

  addToFavourites = (fileId) => {
    this.token = JSON.parse(localStorage.getItem("user")).token;
    this.favouriteFile.file_id = fileId;

    let headers = new Headers({ 'x-access-token': this.token });
    let options = new RequestOptions({ headers: headers });

    return this.http.post(this.url + '/favourites', this.favouriteFile, options)
      .map(
      res => {
        return res;
      }
      );

  }

  deleteFromFavourites = (fileId) => {
    this.token = JSON.parse(localStorage.getItem("user")).token;

    let headers = new Headers({ 'x-access-token': this.token });
    let options = new RequestOptions({ headers: headers });

    return this.http.delete(this.url + '/favourites/file/' + fileId, options)
      .map(
      res => {
        return res;
      }
      );
  }

  postComment = (comment: any) => {
    console.log(comment);
    return this.http.post(this.url + `/comments?token=` + JSON.parse(localStorage.getItem('user')).token, comment).map(
      res => {
        res.json()
      }
    );
  }

  getComment = (fileId: number) => {
    console.log(fileId);
    return this.http.get(this.url + '/comments/file/' + fileId).map(
      res => {
        console.log(res);
        res.json()
      }
    );
  }
}
