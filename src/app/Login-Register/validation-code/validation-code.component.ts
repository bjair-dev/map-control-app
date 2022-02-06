import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {
  AlertController,
  LoadingController,
  ToastController,
} from '@ionic/angular';
import { ServiciosGenerales } from 'src/app/components/services/servicios-generales.service';
import { CodeInputComponent } from 'angular-code-input';
import { LoginService } from 'src/app/components/services/login.service';

@Component({
  selector: 'app-validation-code',
  templateUrl: './validation-code.component.html',
  styleUrls: ['./validation-code.component.scss'],
})
export class ValidationCodeComponent implements OnInit {
  constructor(
    private _service: ServiciosGenerales,
    private fb: FormBuilder,
    private _login: LoginService,
    public router: Router,
    public toastController: ToastController,
    private loadingController: LoadingController,

    public alertController: AlertController
  ) {}
  @ViewChild('codeInput') codeInput!: CodeInputComponent;
  ngOnInit() {}
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
      message: 'Ocurrió un error en el sistema, vuelva a intentar el proceso.',
      buttons: ['Aceptar'],
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
  }

  async errorServicio() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Sistema',
      subHeader: '',
      message:
        'Ocurrió un error en el proceso de la validación, cierre el aplicativo y vuelva a intentar.',
      buttons: ['Aceptar'],
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
  }

  correoForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    code_verification: ['', [Validators.required]],
  });
  async presentLoading(message: string = 'Verificando.....') {
    if (this.codigo !== null) {
      const loading = await this.loadingController.create({
        cssClass: '',
        message,
      });
      await loading.present();
      return loading;
    }
  }
  async validarCorreo() {
    const loading = await this.presentLoading();

    if (!this.codigo) {
      const toast = await this.toastController.create({
        message: 'Se requiere un código de 4 dígitos',
        duration: 4000,
      });
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
            message: 'El código se ha verificado con exito"',
            duration: 4000,
          });
          toast.present();
          loading.dismiss();

          this._login
            .loginNormal(
              localStorage.getItem('email'),
              localStorage.getItem('pass')
            )
            .subscribe((response: any) => {
              localStorage.setItem('map_control', response['JWT']);
              this.router.navigateByUrl('/terms-conditions');
            });
          localStorage.removeItem('email');
          localStorage.removeItem('pass');
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
