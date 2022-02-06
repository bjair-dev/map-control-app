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
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent implements OnInit {
  constructor(
    private _service: ServiciosGenerales,
    private fb: FormBuilder,
    public router: Router,
    public toastController: ToastController,
    public alertController: AlertController,
    public loadingController: LoadingController
  ) {}
  volverLogin() {
    this.router.navigate(['/login']);
  }
  ngOnInit() {}
  sendForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
  });

  async presentLoading(message: string = 'Validando correo.....') {
    if (this.sendForm !== null) {
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

    if (!this.sendForm.get('email').value) {
      const toast = await this.toastController.create({
        message: 'Inserta un correo valido',
        duration: 4000,
      });
      toast.present();
      loading.dismiss();

      return;
    }
    let emailvalidate = {
      email: this.sendForm.get('email').value,
    };

    this._service.enviarCodigo(emailvalidate).subscribe(
      async (response) => {
        const toast = await this.toastController.create({
          message: response,
          duration: 4000,
        });
        toast.present();
        loading.dismiss();
        this.router.navigateByUrl('/validation-pass');
        localStorage.setItem('email', this.sendForm.get('email').value);
      },
      async (error) => {
        const toast = await this.toastController.create({
          message: error.error.errors[0].msg,
          duration: 4000,
        });
        toast.present();
        loading.dismiss();
      }
    );
  }
}
