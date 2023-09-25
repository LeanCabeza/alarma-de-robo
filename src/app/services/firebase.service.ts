import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { NavController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map } from 'rxjs/operators';
import Swal from 'sweetalert2'




@Injectable({
  providedIn: 'root'
})

export class FirebaseService {

  constructor(public auth: AngularFireAuth,
              public navCtrl: NavController, 
              public alertController: AlertController,
              private firestore: AngularFirestore
              ) { }

   myDate = new Date();
   cosasLindas: any[] = [];

  login(correo:any, password:any){
        this.auth.signInWithEmailAndPassword(correo,password).then((res) => {
          let userCorreo = res.user?.email ? res.user?.email : '';
          localStorage.setItem("correo", userCorreo);
          this.navCtrl.navigateRoot('/home');
          console.log(userCorreo);
        }).catch(async (error) => {
          let errorMessage = error.message;
          if (errorMessage.includes('correo', 'password') || !correo.valid && !password.valid) {
            errorMessage = 'Debe ingresar un correo y contraseña correcta';
          } else if (errorMessage.includes('password') || !password.valid) {
            errorMessage = 'Por favor, ingrese una contraseña válida.';
          } else {
            errorMessage = "Usuario inexistente";
          }
          console.log(errorMessage);

         this.presentAlert("Error",errorMessage)
        });
    }

    async presentAlert(header: string, subHeader: string, message?: string) {
      const alert = await this.alertController.create({
        header: header,
        subHeader: subHeader,
        message: message,
        buttons: ['OK'],
      });
      await alert.present();
    }

    getUserLogged(){
      return this.auth.authState;
    }

    async logout() {

      Swal.fire({
        title: 'Estas seguro de que queres salir?',
        text: "No hay vuelta atras eh!",
        icon: 'warning',
        heightAuto: false,
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, deseo salir'
      }).then((result) => {
        if (result.isConfirmed) {
          try {
            this.auth.signOut();
            localStorage.removeItem("correo"); 
            this.navCtrl.navigateRoot('/login'); 
          } catch (error) {
            console.error('Error al cerrar sesión:', error);
          }
          Swal.fire({
            title: 'Saliste con exito',
            text: "Hasta pronto",
            icon: 'success',
            heightAuto: false
          });
        }
      })
    }
    
  }
