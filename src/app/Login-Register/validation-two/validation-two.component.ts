import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  AlertController,
  LoadingController,
  ToastController,
} from '@ionic/angular';
import { ServiciosGenerales } from 'src/app/components/services/servicios-generales.service';

@Component({
  selector: 'app-validation-two',
  templateUrl: './validation-two.component.html',
  styleUrls: ['./validation-two.component.scss'],
})
export class ValidationTwoComponent implements OnInit {
  constructor(
    private _service: ServiciosGenerales,

    public router: Router,
    public toastController: ToastController,
    public alertController: AlertController,
    public loadingController: LoadingController
  ) {}
  onCodeChanged(code: string) {}

  onCodeCompleted(code: string) {
    this.codigo = code;
  }
  codigo;

  async errorSistema() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Sistema',
      subHeader: '',
      message: 'Ocurrió un error en el proceso de cambio de contraseña.',
      buttons: ['Aceptar'],
    });

    await alert.present();
  }

  ngOnInit() {}

  async presentLoading(message: string = 'Validando .....') {
    if (this.codigo !== null) {
      const loading = await this.loadingController.create({
        cssClass: '',
        message,
      });
      await loading.present();
      return loading;
    }
  }

  async validarCodigo() {
    const loading = await this.presentLoading();

    if (!this.codigo) {
      const toast = await this.toastController.create({
        message: 'Se requiere un código de 4 dígitos',
        duration: 4000,
      });
      this.codigo = '';
      toast.present();
      loading.dismiss();
      return;
    }
    if (localStorage.getItem('email') !== null) {
      let PassUser = {
        email: localStorage.getItem('email'),
        code_verification: this.codigo,
      };

      this._service.validarUser(PassUser).subscribe(
        async (response) => {
          const toast = await this.toastController.create({
            message: 'El código se ha verificado con exito',
            duration: 3000,
          });
          toast.present();
          loading.dismiss();

          localStorage.setItem('code', this.codigo);
          this.router.navigateByUrl('/send-pass');
        },
        async (error) => {
          if (error.status == 401) {
            const toast = await this.toastController.create({
              message: error.error.errors[0].msg,
              duration: 4000,
            });
            toast.present();
            loading.dismiss();

            this._service.signout();
          } else {
            const toast = await this.toastController.create({
              message: error.error.errors[0].msg,
              duration: 4000,
            });
            toast.present();
            loading.dismiss();
          }
        }
      );
    } else {
      this.errorSistema();
      this._service.signout();
      loading.dismiss();
    }
  }

  volverLogin() {
    localStorage.removeItem('email');
    this.router.navigate(['/login']);
  }
}
