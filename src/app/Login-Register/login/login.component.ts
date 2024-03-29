import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import {
  IonSlides,
  LoadingController,
  Platform,
  ToastController,
} from "@ionic/angular";
import { IPayload } from "src/app/components/interface/login-interface";
import { LoginService } from "src/app/components/services/login.service";
import { OneSignal } from "@ionic-native/onesignal/ngx";
import { ServiciosGenerales } from "src/app/components/services/servicios-generales.service";
import { Facebook, FacebookLoginResponse } from "@ionic-native/facebook/ngx";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  constructor(
    public router: Router,
    private facebook: Facebook,

    private platform: Platform,
    private oneSignal: OneSignal,
    private sGenerales: ServiciosGenerales,
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
    email: ["", [Validators.required]],
  });

  form2: FormGroup = this.fb.group({
    /*     email: ['', [Validators.required, Validators.email]],
     */ password: ["", [Validators.required]],
  });
  async presentToast(m, d) {
    const toast = await this.toastController.create({
      message: m,
      duration: d,
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
      this.presentToast("Debe ingresar un email valido", 4000);
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
      this.presentToast("La contraseña no puede estar vacio", 4000);
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
          this.configSignal();

          localStorage.setItem("map_control", response["JWT"]);
          this.oneSignal.sendTag("name", localStorage.getItem("Nombre"));

          // this._serviceG.getProfile();
          /*           this.oneSignal.sendTag('name', localStorage.getItem('Nombre'));
           */
          localStorage.removeItem("Nombre");

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

  onseSignalAppId: string = "745e92d8-31fb-47ed-9315-b3ff0e90528e";
  googleProjectId: string = "239683653001";
  configSignal() {
    console.log("aqui llego");

    this.platform.ready().then(() => {
      console.log(this.platform, "1");
      if (this.platform.is("capacitor")) {
        console.log("2");
        if (this.platform.is("android")) {
          console.log("3");
          this.oneSignal.startInit(this.onseSignalAppId, this.googleProjectId);
          console.log(
            "paso por aqui",
            this.onseSignalAppId,
            this.googleProjectId
          );
        }
        if (this.platform.is("ios")) {
          this.oneSignal.startInit(this.onseSignalAppId);
        }
        this.oneSignal.inFocusDisplaying(
          this.oneSignal.OSInFocusDisplayOption.Notification
        );

        console.log("4");
        this.oneSignal.endInit();
        console.log("5");
        this.oneSignal
          .getIds()
          .then((identity) => {
            console.log("6");
            console.log("configSignal identity", identity);
            this.sGenerales.enviarCodigos(identity.userId).subscribe(
              (data) => {
                console.log("updateIdDevice OK");
              },
              (err) => {
                console.log("updateIdDevice ERR", err);
              }
            );
          })
          .catch((err) => {
            console.error("Error configSignal identity", err);
          });
      }
    });
  }

  async loginWithFb() {
    console.log("fb");

    this.facebook
      .login(["public_profile", "email"])
      .then((res: FacebookLoginResponse) => {
        console.log("Logged into Facebook!", res);

        this.facebook
          .api(
            "me?fields=" +
              [
                "name",
                "email",
                "first_name",
                "last_name",
                "picture.type(large)",
              ].join(),
            null
          )
          .then(async (user: any) => {
            console.log(user, "recibe");
            const userFacebook = {
              name: user.first_name,
              lastname: user.last_name,
              password: "",
              email: user.email,
              path: user.picture.data.url,
              sexo: "no especificado",
              origin: "facebook",
            };
            console.log(userFacebook, "esto recibe");

            this.loginRedes(userFacebook);
            // const loading = await this.presentLoading();
            // console.log('data del usuario FB', userFacebook);
            // this._login.loginSocialNetwork(userFacebook).subscribe(
            //   async (data) => {
            //     console.log('la data es ', data);
            //     const toast = await this.toastController.create({
            //       message: 'Bievenido, el cambio comienza ahora',
            //       duration: 4000,
            //     });
            //     toast.present();

            //     localStorage.setItem('cofide_token', data['JWT']);
            //     this.oneSignal.sendTag('name', userFacebook.name);

            //     this.configSignal();

            //     this.actualizaDia();
            //     loading.dismiss();
            //     this.router.navigateByUrl('/dashboard-cofide');
            //   },
            //   async (err) => {
            //     console.log(err);
            //     loading.dismiss();
            //     const toast = await this.toastController.create({
            //       message: 'Ocurrio un error, intentelo más tarde',
            //       duration: 2000,
            //     });
            //     toast.present();
            //   }
            // );
          })
          .catch(async (e) => {
            console.log(e);
            const toast = await this.toastController.create({
              message: "Ocurrió un error, intentelo más tarde",
              duration: 2000,
            });
            toast.present();
          });
      })
      .catch(async (e) => {
        console.log(e.errorMessage);
        const toast = await this.toastController.create({
          message: "Ocurrió un error, intentelo más tarde",
          duration: 2000,
        });
        toast.present();
      });
  }

  async loginRedes(obj) {
    console.log(obj, "esto recibe de la funcion ");
    // let obj = {
    //   name: 'Pruebas',
    //   lastname: 'dev frank',
    //   password: '',
    //   email: 'croujoitratreuke-3005@yopmail.com',
    //   sexo: 'no especificado',
    //   origin: 'google',
    // };
    // console.log(obj);

    let obj2 = {
      email: obj.email,
      password: obj.password,
    };
    // console.log(obj2);
    //verificar si usuario existe
    /*   const loading = await this.presentLoading(); */
    this._login.verificarEmailUser(obj2).subscribe(
      async (data) => {
        console.log(obj2);
        console.log(data);

        if (data) {
          // console.log('existe, pasar');
          // console.log('la data es ', data);
          localStorage.removeItem("map_control");
          const toast = await this.toastController.create({
            message: "Bievenido, el cambio comienza ahora",
            duration: 4000,
          });
          toast.present();

          localStorage.setItem("map_control", data["JWT"]);

          this.oneSignal.sendTag("name", obj.name);

          this.configSignal();

          /*  this.actualizaDia(); */
          /*    loading.dismiss(); */
          this.router.navigateByUrl("/dashboard/home");
        } else {
          // console.log('no existe enviar registro');
          /*  this._login.userRedesSociales = obj;
          loading.dismiss();
          this.router.navigateByUrl("/register-social-cofide"); */

          let userx = {
            name: obj.name,
            lastname: obj.lastname,
            dni: "",
            email: obj.email,
            path: obj.path,
            date_of_birth: "2000-01-01",
            cellphone: "999999999",
            sexo: "no especificado",
            password: "",
            origin: "facebook",
            code_departamento: "15",
            code_provincia: "1501",
            ubigeo: "150101",
            name_departamento: "LIMA",
            name_provincia: "LIMA",
            name_distrito: "LIMA",
            key: "null",
          };

          // console.log(user);
          this._login.loginSocialNetwork(userx).subscribe(
            async (data) => {
              localStorage.setItem("map_control", data["JWT"]);
              // this.presentToast('Bievenido, el cambio comienza ahora', 4000);
              this.oneSignal.sendTag("name", obj.name);
              this.configSignal();
              /*    this.actualizaDia(); */
              /*   loading.dismiss(); */
              this.router.navigateByUrl("/dashboard/home");
            },
            (error) => {
              this.presentToast("No se pudo registrar correctamente", 4000);
              /*   loading.dismiss(); */
            }
          );
        }
      },
      (error) => {
        console.log(error);
        /*      loading.dismiss(); */
      }
    );
  }
}
