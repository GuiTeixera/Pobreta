import { HomePage } from './../pages/home/home';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AccountProvider } from '../providers/account/account';
import { ToastProvider } from '../providers/toast/toast';
import { SigninPage } from '../pages/signin/signin';
import { HomeProvider } from '../providers/home/home';
import { DetalheProvider } from '../providers/detalhe/detalhe';


@NgModule({
  declarations: [
    MyApp,
    SigninPage,
    HomePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp({
      apiKey: "AIzaSyAuXs7Wh9ndzNVxRaq6dy2nScpEckROfDc",
      authDomain: "pobreta-e0ca4.firebaseapp.com",
      databaseURL: "https://pobreta-e0ca4.firebaseio.com",
      projectId: "pobreta-e0ca4",
      storageBucket: "pobreta-e0ca4.appspot.com",
      messagingSenderId: "432377849257",

    }),
    AngularFireDatabaseModule,
    AngularFireAuthModule

  ],

  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    SigninPage,
    HomePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AccountProvider,
    ToastProvider,
    HomeProvider,
    DetalheProvider,

  ]
})
export class AppModule {}
