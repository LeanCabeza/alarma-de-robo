import { Component, OnDestroy } from '@angular/core';
import { Flashlight } from '@awesome-cordova-plugins/flashlight/ngx';
import { Vibration } from '@awesome-cordova-plugins/vibration/ngx';
import { DeviceMotion, DeviceMotionAccelerationData } from '@awesome-cordova-plugins/device-motion/ngx';
import { NavController } from '@ionic/angular';
import { FirebaseService } from 'src/app/services/firebase.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnDestroy {
  alarmActivated = false;
  passwordUser = '';

  accelerationX: number | null = null;
  accelerationY: number | null = null;
  accelerationZ: number | null = null;
  subscription: any;

  audioIzquierda = '/assets/sounds/izquierda.mp3';
  audioDerecha = '/assets/sounds/derecha.mp3';
  audioVertical = '/assets/sounds/arriba.mp3';
  audioHorizontal = '/assets/sounds/abajo.mp3';
  audioPass = '/assets/sounds/wrongPass.mp3';
  audio = new Audio();

  firstAdmission = true;
  firstAdmissionFlash = true;

  currentPositionCellPhone = 'actual';
  previousPositionCellPhone = 'anterior';

  currentUser: any;
  currentPass: any;

  constructor(
    private flashlight: Flashlight,
    private vibration: Vibration,
    private deviceMotion: DeviceMotion,
    public navCtrl: NavController,
    private firebaseService: FirebaseService
  ) {
    this.currentUser = localStorage.getItem('correo');
    this.currentPass = localStorage.getItem('password');
  }

  ngOnInit(){
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  logoutUser() {
    this.firebaseService.logout();
  }

  activarAlarma() {
    Swal.fire({
      title: '¿Estás seguro de activar la alarma?',
      text: 'Para desactivarla, necesitarás la contraseña.',
      icon: 'warning',
      heightAuto: false,
      showCancelButton: true,
      confirmButtonColor: 'green',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Activar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.alarmActivated = true;
        this.alarmaActivada();
        Swal.fire({
          title: 'Alarma Activada',
          icon: 'success',
          heightAuto: false,
        });
      }
    });
  }

  desactivarAlarma(redirect: boolean) {
    Swal.fire({
      title: 'Por favor, ingresa tu contraseña',
      input: 'password',
      heightAuto: false,
      inputAttributes: {
        autocapitalize: 'off',
      },
      showCancelButton: true,
      confirmButtonText: 'Desactivar',
      showLoaderOnConfirm: true,
      preConfirm: (passInput) => {
        if (this.currentPass == passInput) {
          if (!redirect) {
            Swal.fire({
              title: 'Alarma Desactivada',
              icon: 'success',
              heightAuto: false,
            });
            this.audio.pause();
            this.alarmActivated = false;
            this.subscription.unsubscribe();
          } else {
            this.firebaseService.logout();
            this.audio.pause();
            this.alarmActivated = false;
            this.subscription.unsubscribe();
          }
        } else {
          Swal.showValidationMessage('Contraseña incorrecta');
          this.passIncorrecta();
        }
      },
      allowOutsideClick: () => !Swal.isLoading(),
    });
  }

  alarmaActivada() {
    this.subscription = this.deviceMotion
      .watchAcceleration({ frequency: 300 })
      .subscribe((acceleration: DeviceMotionAccelerationData) => {
        this.accelerationX = Math.floor(acceleration.x);
        this.accelerationY = Math.floor(acceleration.y);
        this.accelerationZ = Math.floor(acceleration.z);

        if (acceleration.x > 5) {
          this.currentPositionCellPhone = 'izquierda';
          this.movimientoIzquierda();
        } else if (acceleration.x < -5) {
          this.currentPositionCellPhone = 'derecha';
          this.movimientoDerecha();
        } else if (acceleration.y >= 9) {
          this.currentPositionCellPhone = 'arriba';

          if (this.currentPositionCellPhone != this.previousPositionCellPhone) {
            this.audio.src = this.audioVertical;
            this.previousPositionCellPhone = 'arriba';
          }
          this.audio.play();
          this.movimientoVertical();
        } else if (
          acceleration.z >= 9 &&
          acceleration.y >= -1 &&
          acceleration.y <= 1 &&
          acceleration.x >= -1 &&
          acceleration.x <= 1
        ) {
          this.currentPositionCellPhone = 'plano';
          this.movimientoHorizontal();
        }
      });
  }

  passIncorrecta() {
    this.firstAdmission = false;
    this.audio.src = this.audioPass;
    this.audio.play();
    this.firstAdmission ? null : this.vibration.vibrate(5000);
    this.firstAdmission = true;

    if (this.firstAdmissionFlash) {
      this.firstAdmissionFlash ? this.flashlight.toggle() : false;
      setTimeout(() => {
        this.firstAdmissionFlash = true;
        this.flashlight.switchOff();
      }, 5000);
    }
  }

  movimientoIzquierda() {
    this.firstAdmission = false;
    this.firstAdmissionFlash = true;
    if (this.currentPositionCellPhone != this.previousPositionCellPhone) {
      this.previousPositionCellPhone = 'izquierda';
      this.audio.src = this.audioIzquierda;
    }
    this.audio.play();
  }

  movimientoDerecha() {
    this.firstAdmission = false;
    this.firstAdmissionFlash = true;
    if (this.currentPositionCellPhone != this.previousPositionCellPhone) {
      this.previousPositionCellPhone = 'derecha';
      this.audio.src = this.audioDerecha;
    }
    this.audio.play();
  }

  movimientoVertical() {
    if (this.firstAdmissionFlash) {
      this.firstAdmissionFlash ? this.flashlight.switchOn() : false;
      setTimeout(() => {
        this.firstAdmissionFlash = false;
        this.flashlight.switchOff();
      }, 5000);
      this.firstAdmission = false;
    }
  }

  movimientoHorizontal() {
    if (this.currentPositionCellPhone != this.previousPositionCellPhone) {
      this.previousPositionCellPhone = 'plano';
      this.audio.src = this.audioHorizontal;
    }
    this.firstAdmission ? null : this.audio.play();
    this.firstAdmission ? null : this.vibration.vibrate(5000);
    this.firstAdmission = true;
    this.firstAdmissionFlash = true;
  }

  logout() {
    this.firebaseService.logout();
  }
}