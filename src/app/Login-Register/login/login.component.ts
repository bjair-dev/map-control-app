import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { IonSlides, LoadingController, ToastController } from "@ionic/angular";
import { IPayload } from "src/app/components/interface/login-interface";
import { LoginService } from "src/app/components/services/login.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  constructor(
    public router: Router,
    public loadingController: LoadingController,
    private _login: LoginService,
    public toastController: ToastController,
    private fb: FormBuilder
  ) {}

  ngOnInit() {}
  slideOpts = {
    allowTouchMove: false,
    initialSlide: 0,
  };
  olvidePass() {
    this.form.reset();
    this.form2.reset();
    this.router.navigateByUrl("/send-mail");
  }
  form: FormGroup = this.fb.group({
    email: ["bryano@yopmail.com", [Validators.required]],
  });

  form2: FormGroup = this.fb.group({
    /*     email: ['', [Validators.required, Validators.email]],
     */ password: ["gabriel@1", [Validators.required]],
  });
  async presentToast(m) {
    const toast = await this.toastController.create({
      message: m,
      duration: 2000,
    });
    toast.present();
  }
  async presentLoading(message: string = "Verificando.....") {
    if (this.form !== null) {
      const loading = await this.loadingController.create({
        cssClass: "",
        message,
      });
      await loading.present();
      return loading;
    }
  }

  async verifyEmail(slide: IonSlides) {
    if (
      this.form.get("email").value == "" ||
      this.form.get("email").value == undefined ||
      this.form.get("email").value == null ||
      this.form.get("email").invalid
    ) {
      this.presentToast("Debe ingresar un email valido");
      return;
    } else {
      const loading = await this.presentLoading("Verificando...");

      slide.lockSwipes(false);
      slide.slideNext();
      loading.dismiss();
    }
  }

  async login() {
    if (
      this.form2.get("password").value == "" ||
      this.form2.get("password").value == undefined ||
      this.form2.get("password").value == null
    ) {
      this.presentToast("La contraseña no puede estar vacio");
      return;
    }
    const loading = await this.presentLoading();

    const oHeader = { alg: "HS256", typ: "JWT" };
    // Payload
    const oPayload: IPayload = {
      email: this.form.get("email").value,
      password: this.form2.get("password").value,
    };
    const sHeader = JSON.stringify(oHeader);
    const sPayload = JSON.stringify(oPayload);

    this._login

      .loginNormal(
        this.form.get("email").value,
        this.form2.get("password").value
      )
      .subscribe(
        async (response: any) => {
          const toast = await this.toastController.create({
            message: "Bievenido, se parte del cambio con Nika",
            duration: 4000,
          });
          toast.present();
          this.form.reset();
          this.form2.reset();

          localStorage.setItem("map_control", response["JWT"]);
          /*           this.oneSignal.sendTag('name', localStorage.getItem('Nombre'));
           */
          // this._serviceG.getProfile();
          /*           this.oneSignal.sendTag('name', localStorage.getItem('Nombre'));
           */
          /*           this.configSignal();
           */ localStorage.removeItem("Nombre");

          /*           this.actualizaDia();
           */ loading.dismiss();
          this.router.navigateByUrl("/dashboard");
        },

        async (error) => {
          /*     console.log(error);
          console.log(error.error.message); */
          loading.dismiss();

          if (
            error.error.message ==
            "El correo electrónico que ingresaste no está conectado a una cuenta"
          ) {
            const toast = await this.toastController.create({
              message: error.error.message,
              duration: 3000,
            });
            toast.present();
            localStorage.setItem("email", this.form.get("email").value);
            this.form.reset();
            this.form2.reset();
            this.router.navigateByUrl("/register");
          }

          if (
            error.error.message ==
            "Falta activar tu correo , ve a la zona en donde ingresarás el código de verificación"
          ) {
            const toast = await this.toastController.create({
              message: error.error.message,
              duration: 3000,
            });
            toast.present();
            localStorage.setItem("email", this.form.get("email").value);
            localStorage.setItem("pass", this.form2.get("password").value);
            this.form.reset();
            this.form2.reset();
            this.router.navigateByUrl("/validation");
          } else {
            const toast = await this.toastController.create({
              message: error.error.message,
              duration: 4000,
            });
            toast.present();
            loading.dismiss();
          }
          loading.dismiss();
        }
      );
  }

  entrarRegister() {
    this.router.navigateByUrl("/register");
  }
}
