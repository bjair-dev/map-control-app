import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {
  AlertController,
  LoadingController,
  ToastController,
} from '@ionic/angular';
import { ServiciosGenerales } from 'src/app/components/services/servicios-generales.service';

@Component({
  selector: 'app-send-password',
  templateUrl: './send-password.component.html',
  styleUrls: ['./send-password.component.scss'],
})
export class SendPasswordComponent implements OnInit {
  constructor(
    private _service: ServiciosGenerales,
    private fb: FormBuilder,

    public router: Router,
    public toastController: ToastController,
    public alertController: AlertController,
    public loadingController: LoadingController
  ) {}

  ngOnInit() {}
  sendForm: FormGroup = this.fb.group(
    {
      password: ['', [Validators.required]],
      confirmpassword: ['', [Validators.required]],
    },
    { validator: this.passwordMatchValidator }
  );

  passwordMatchValidator(g: FormGroup) {
    return g.get('password').value === g.get('confirmpassword').value
      ? null
      : { mismatch: true };
  }
  async presentLoading(message: string = 'Validando contraseña.....') {
    if (this.sendForm !== null) {
      const loading = await this.loadingController.create({
        cssClass: '',
        message,
      });
      await loading.present();
      return loading;
    }
  }

  async presentToast(m) {
    const toast = await this.toastController.create({
      message: m,
      duration: 2000,
    });
    toast.present();
  }

  cleanPass() {
    this.sendForm.get('password').reset();
    this.sendForm.get('confirmpassword').reset();
  }

  async validarPass() {
    if (
      this.sendForm.get('password').value == '' ||
      this.sendForm.get('password').value == undefined ||
      this.sendForm.get('password').value == null
    ) {
      this.presentToast('Debe ingresar una contraseña');
      this.cleanPass();
      return;
    }
    if (
      this.sendForm.get('confirmpassword').value == '' ||
      this.sendForm.get('confirmpassword').value == undefined ||
      this.sendForm.get('confirmpassword').value == null
    ) {
      this.presentToast('Debe repetir la contraseña');
      this.cleanPass();
      return;
    }
    if (
      this.sendForm.get('password').value !==
      this.sendForm.get('confirmpassword').value
    ) {
      this.presentToast('Las contraseñas no son iguales.');
      this.cleanPass();
      return;
    } else {
      const loading = await this.presentLoading();

      if (!this.sendForm.get('password').value) {
        const toast = await this.toastController.create({
          message: 'Se requiere al menos un numero y un caracter especial',
          duration: 4000,
        });
        toast.present();
        loading.dismiss();

        return;
      }
      let emailvalidate = {
        email: localStorage.getItem('email'),
        code_verification: localStorage.getItem('code'),
        new_password: this.sendForm.get('password').value,
      };

      this._service.changePass(emailvalidate).subscribe(
        async (response) => {
          const toast = await this.toastController.create({
            message: response,
            duration: 3000,
          });
          toast.present();
          loading.dismiss();

          this.sendForm.reset();
          localStorage.removeItem('email');
          localStorage.removeItem('code');
          this.router.navigateByUrl('/login');
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
    }
  }
}
