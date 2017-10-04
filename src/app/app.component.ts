import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import firebase from 'firebase';

import { HomePage } from '../pages/home/home';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {

    firebase.initializeApp({
      // apiKey: "AIzaSyBJTmt3LGBm5CTiO5DUZ4W3O5mTLphaoKY",
      // authDomain: "javebratt-playground.firebaseapp.com",
      // databaseURL: "https://javebratt-playground.firebaseio.com",
      // projectId: "javebratt-playground",
      // storageBucket: "javebratt-playground.appspot.com",
      // messagingSenderId: "369908572440"
       apiKey: "AIzaSyDfM-x9K0mRNVuX5r5u4zXTZ8R6G9xsz6U",
  authDomain: "testb-7a019.firebaseapp.com",
  databaseURL: "https://testb-7a019.firebaseio.com",
  projectId: "testb-7a019",
  storageBucket: "testb-7a019.appspot.com",
  messagingSenderId: "569568416674"
    });

    const unsubscribe = firebase.auth().onAuthStateChanged( user => {
      if(!user){
        this.rootPage = 'LoginPage';
        unsubscribe();
      } else {
        this.rootPage = HomePage;
        unsubscribe();
      }
    });

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}

