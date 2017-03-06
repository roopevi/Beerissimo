<<<<<<< HEAD
import { ProfilepicService } from './../providers/profilepic-service';
=======
import { DatePipe } from './../pipes/date';
>>>>>>> df5d1e75bc0ad9755fa035e73927331b7cf14b10
import { MediaplayerPage } from './../pages/mediaplayer/mediaplayer';
import { UploadService } from './../providers/upload-service';
import { UploadPage } from './../pages/upload/upload';
import { SearchPage } from './../pages/search/search';
import { ThumbnailPipe } from './../pipes/thumbnail';
import { ProfilePage } from './../pages/profile/profile';
import { LogoutPage } from './../pages/logout/logout';
import { RegisterService } from './../providers/register-service';
import { MediaService } from './../providers/media-service';
import { LoginService } from './../providers/login-service';
import { RegisterPage } from './../pages/register/register';
import { LoginPage } from './../pages/login/login';
import { FrontPage } from './../pages/front/front';
import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

@NgModule({
  declarations: [
    MyApp,
    FrontPage,
    LoginPage,
    RegisterPage,
    LogoutPage,
    ProfilePage,
    ThumbnailPipe,
    DatePipe,
    SearchPage,
    UploadPage,
    MediaplayerPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    FrontPage,
    LoginPage,
    RegisterPage,
    LogoutPage,
    ProfilePage,
    SearchPage,
    UploadPage,
    MediaplayerPage
  ],

  providers: [{ provide: ErrorHandler, useClass: IonicErrorHandler }, MediaService, LoginService, RegisterService, UploadService, ProfilepicService]

})
export class AppModule { }
