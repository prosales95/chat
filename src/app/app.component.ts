import { Component, ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import {  GoogleAnalytics } from 'ionic-native';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { AboutPage } from '../pages/about/about';
import { RegisterPage } from '../pages/register/register';
import { ChatPage } from '../pages/chat/chat';
import { ImportantPage } from '../pages/important/important';
import { QuotesListPage } from '../pages/quotes-list/quotes-list';
import { QuotesDetailPage } from '../pages/quotes-detail/quotes-detail';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage:any = HomePage;

  pages: Array <{title: string, icon: string, component: any}>;

  constructor(public platform: Platform, private statusBar:
    StatusBar, private splashScreen: SplashScreen) {
    this.initializeApp();

//used for ex of ngFor and nav
this.pages = [
{title: 'Home', icon: 'home', component: HomePage},
{title: 'Chat', icon: 'star',  component: ChatPage},
{title: 'Register', icon: 'heart', component: RegisterPage},
{title: 'About Us', icon: 'information-circle', component: AboutPage},
{title: 'Tasks & Duties', icon: 'ios-clock', component: ImportantPage},
{title: 'Quotes-Detail', icon: 'contact',  component: QuotesDetailPage},
{title: 'Quotes-List', icon: 'list-box', component: QuotesListPage}

]
}

initializeApp () {
//platf ready and plugins availab
//here for any high level native process
this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      GoogleAnalytics.startTrackerWithId("UA-120265140-1");
      GoogleAnalytics.enableUncaughtExceptionReporting(true).then
      ((_success) => {
        console.log("Successful enabling of uncaught exception reporting "+
          _success)
      }).catch((_error) => {
        console.log("error occured "+_error)
      });
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
}

openPage(page) {
  //reset content nav to just this page
  // no need back button to show in screen
  this.nav.setRoot(page.component)
}

}


