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

  }

  /*Create a tag object that contains file_id and tag*/
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

  /*Takes parameter from popover.ts and sends chosen image to API*/
  changeProfilePic = (formData: any) => {
    return this.http.post(this.url + '/media?token=' + JSON.parse(localStorage.getItem('user')).token,
      formData).map(
      resp => {

        /*Sets the response to a variable*/
        const dataFromServer = resp.json();

        /*Sets the file_id from the response to a variable*/
        this.id = dataFromServer.file_id;

        /*Creates a tag for profile pictures of the app*/
        const tag: string = 'BeerissimoProfilepic';

        /*Runs addTag function to connect id and tag to one object*/
        this.addTag(this.id, tag);

        return this.id;

      });
  }
  /*Return all files with a tag "BeerissimoProfilepic"*/
  getPicFromApi = () => {
    return this.http.get(this.url + "/tags/BeerissimoProfilepic")
      .map(
      res =>
        res.json()

      );
  };

  /*Return profile picture*/
  getProfilePic = (image) => {
    let pic = image;
    return pic;
  }
}
