import { LoginService } from './login-service';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the UploadService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class UploadService {

  private url: string = 'http://media.mw.metropolia.fi/wbma';
  private token: string = '';
  private id: number;

  constructor(public http: Http, private loginService: LoginService) {
    console.log('Hello UploadService Provider');
    this.token = this.loginService.getUser().token;
  }

  upload = (formData: any) => {
    return this.http.post(this.url + '/media?token=' + JSON.parse(localStorage.getItem('user')).token,
    formData).map(
      resp => {
        const dataFromServer = resp.json();

        this.id = dataFromServer.file_id;

        const tag: string = 'Beerissimo';

        this.addTag(this.id, tag);
        console.log(dataFromServer);

      }
    );
  }

  addTag = (id, tag) => {
    const tagObject = {
      file_id: id,
      tag: tag
    };

    return this.http.post(this.url + `/tags?token=` + JSON.parse(localStorage.getItem('user')).token, tagObject).subscribe(
      resp => {
        resp.json();
        console.log(resp);
      }
    );
  }

}
