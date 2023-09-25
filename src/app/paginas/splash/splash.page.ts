import { Component, OnInit } from '@angular/core';
import { SplashScreen } from '@capacitor/splash-screen';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-splash',
  templateUrl: './splash.page.html',
  styleUrls: ['./splash.page.scss'],
})
export class SplashPage implements OnInit {

  constructor(private navCtrl: NavController) { }

    ngOnInit() {
      SplashScreen.hide();
      setTimeout(() => {
        this.navCtrl.navigateRoot(['/login']);
      }, 2500);
    }


}