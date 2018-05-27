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
import { RegisterPage } from '../pages/register/register';
import { QuotesListPage } from '../pages/quotes-list/quotes-list';
import { QuotesDetailPage } from '../pages/quotes-detail/quotes-detail';
import { AngularFireModule } from 'angularfire2';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { AngularFireDatabaseModule, AngularFireDatabase } from 'angularfire2/database';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';


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
      QuotesListPage
      ],

      imports: [
      BrowserModule,
      IonicModule.forRoot(MyApp),
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AngularFireModule.initializeApp(config),
    AngularFireStorageModule,
    AngularFireDatabaseModule,
    HttpClientModule,
    HttpModule,
   
    ],
    bootstrap: [IonicApp],
    entryComponents: [
    MyApp,
    HomePage,
    ChatPage,
    AboutPage,
    RegisterPage,
    QuotesListPage,
    QuotesDetailPage
    ],
    providers: [
    StatusBar,
    SplashScreen,
    AngularFireDatabase,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
    ]
})
  export class AppModule {}
