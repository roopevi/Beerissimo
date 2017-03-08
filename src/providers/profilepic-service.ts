import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the ProfilepicService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class ProfilepicService {

  private url: string = 'http://media.mw.metropolia.fi/wbma';
  private id: number;

  constructor(public http: Http) {
    console.log('Hello ProfilepicService Provider');
  }

    addTag = (id, tag) => {
    const tagObject = {
      file_id: id,
      tag: tag
    };

    return this.http.post(this.url + `/tags?token=` + JSON.parse(localStorage.getItem('user')).token, tagObject).subscribe(
      resp => {
        resp.json();
      }
    );
  }

  changeProfilePic = (formData: any) => {
    return this.http.post(this.url + '/media?token=' + JSON.parse(localStorage.getItem('user')).token,
    formData).map(
      resp => {

        const dataFromServer = resp.json();

        this.id = dataFromServer.file_id;
        const tag: string = 'BeerissimoProfilepic';

        this.addTag(this.id, tag);
        localStorage.setItem('image', JSON.stringify(resp));

        return this.id;

      });
  }

  getProfilePic = (image) => {
    let pic = image;
    return pic;
  }
}
