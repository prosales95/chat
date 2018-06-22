import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ChatPage } from '../pages/chat/chat';
import { AboutPage } from '../pages/about/about';
import { ImportantPage } from '../pages/important/important';
import { RegisterPage } from '../pages/register/register';
import { AddtodoPage } from '../pages/addtodo/addtodo';
import { QuotesListPage } from '../pages/quotes-list/quotes-list';
import { QuotesDetailPage } from '../pages/quotes-detail/quotes-detail';
import { AngularFireModule } from 'angularfire2';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { AngularFireDatabaseModule, AngularFireDatabase } from 'angularfire2/database';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { Slides } from 'ionic-angular';
import { DataserviceProvider } from '../providers/dataservice/dataservice';
// These are all imports required for Pro Client with Monitoring & Deploy,
// feel free to merge into existing imports above.
import { Pro } from '@ionic/pro';
import {  Injectable } from '@angular/core';




@Injectable()
export class MyErrorHandler implements ErrorHandler {
  ionicErrorHandler: IonicErrorHandler;



  handleError(err: any): void {
    Pro.monitoring.handleNewError(err);
    // Remove this if you want to disable Ionic's auto exception handling
    // in development mode.
    this.ionicErrorHandler && this.ionicErrorHandler.handleError(err);
  }
}

  // Initialize Firebase
  var config = {
      apiKey: "AIzaSyBBrevlEQ70c4PapdyVRZ5tusJSHGNuZTA",
      authDomain: "test-project-d2fcc.firebaseapp.com",
      databaseURL: "https://test-project-d2fcc.firebaseio.com",
      projectId: "test-project-d2fcc",
      storageBucket: "test-project-d2fcc.appspot.com",
      messagingSenderId: "616288344012"
  };

  @NgModule({
      declarations: [
      MyApp,
      HomePage,
      ChatPage,
      AboutPage,
      RegisterPage,
      QuotesDetailPage,
      QuotesListPage,
      ImportantPage,
        AddtodoPage
      ],

      imports: [
      BrowserModule,
      IonicModule,
      IonicModule.forRoot(MyApp),
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AngularFireModule.initializeApp(config),
    AngularFireStorageModule,
    AngularFireDatabaseModule,
    HttpClientModule,


    ],
    bootstrap: [IonicApp],
    entryComponents: [
    MyApp,
    HomePage,
    ChatPage,
    AboutPage,
    RegisterPage,
    QuotesListPage,
    QuotesDetailPage,
    ImportantPage,
      AddtodoPage
    ],
    providers: [
    StatusBar,
    Slides,
    SplashScreen,
    AngularFireDatabase,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    DataserviceProvider
    ]
})
  export class AppModule {}
