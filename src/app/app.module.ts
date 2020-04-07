import { NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy, ToastController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import {AngularFireModule} from 'angularfire2';
import {AngularFireAuthModule} from 'angularfire2/auth';
import {AngularFireDatabase, AngularFireDatabaseModule} from 'angularfire2/database';
import { ApiProvider } from 'src/providers/api-provider';


const firebaseConfig = {
  apiKey: "AIzaSyDgxywLhX4TSIm3JSuJSbeIr223ex5PMhk",
  authDomain: "moneysaver-f2c56.firebaseapp.com",
  databaseURL: "https://moneysaver-f2c56.firebaseio.com",
  projectId: "moneysaver-f2c56",
  storageBucket: "moneysaver-f2c56.appspot.com",
  messagingSenderId: "946301858847",
  appId: "1:946301858847:web:9ab2a9f61db1b354a7d12a",
  measurementId: "G-NG7QXEML69"
};


@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    AngularFireDatabaseModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    ApiProvider,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
