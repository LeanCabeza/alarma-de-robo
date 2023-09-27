import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from "@angular/fire/compat/auth";
import { Flashlight } from '@ionic-native/flashlight/ngx';
import { Vibration } from '@awesome-cordova-plugins/vibration/ngx';
import { DeviceMotion} from '@awesome-cordova-plugins/device-motion/ngx';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBrts9hTdo-aQEfbKdvqme_fhjM4PfhKFU",
  authDomain: "pps-2023-3661d.firebaseapp.com",
  projectId: "pps-2023-3661d",
  storageBucket: "pps-2023-3661d.appspot.com",
  messagingSenderId: "759605409724",
  appId: "1:759605409724:web:ad60abe94eff4a26585db9"
};

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,AngularFireModule.initializeApp(firebaseConfig),AngularFireAuthModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, Flashlight, Vibration, ScreenOrientation, DeviceMotion],
  bootstrap: [AppComponent],
})
export class AppModule {}
