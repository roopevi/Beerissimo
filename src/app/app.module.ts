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
import { Page1 } from '../pages/page1/page1';
import { Page2 } from '../pages/page2/page2';

@NgModule({
  declarations: [
    MyApp,
    FrontPage,
    LoginPage,
    RegisterPage,
    LogoutPage,
    ProfilePage,
    ThumbnailPipe
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
    ProfilePage
  ],

  providers: [{ provide: ErrorHandler, useClass: IonicErrorHandler }, MediaService, LoginService, RegisterService]

})
export class AppModule { }
