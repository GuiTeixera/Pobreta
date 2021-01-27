import { AngularFireAuth } from 'angularfire2/auth';
import { NavController } from 'ionic-angular';
import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { SigninPage } from '../pages/signin/signin';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: NavController;
  rootPage:any = SigninPage;

  pages: Array<{icon: string, title: string, component: any}>;

  constructor(public platform: Platform,
    public statusBar: StatusBar,
    private auth: AngularFireAuth,
    public splashScreen: SplashScreen) {
      // this.initializeApp();

      this.pages = [
        { icon: 'home', title: 'Pagina Inicial', component: HomePage },
        { icon: 'list-box', title: 'Produtos', component: 'DetalhePage' },
        { icon: 'attach', title: 'Sobre', component: 'SobrePage'}
      ];
  }

  openPage(page) {
    this.nav.setRoot(page.component);
  }

  signOut(){
    this.auth.auth.signOut();
    this.nav.setRoot(SigninPage)
  }

}

