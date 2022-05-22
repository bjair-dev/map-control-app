import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import {
  AlertController,
  IonSlides,
  LoadingController,
  ToastController,
} from "@ionic/angular";
import { LoginService } from "src/app/components/services/login.service";
import { RegisterService } from "src/app/components/services/register.service";
import { ServiciosGenerales } from "src/app/components/services/servicios-generales.service";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"],
})
export class RegisterComponent implements OnInit {
  userRedesSociales = null;
  slideOpts;
  constructor(
    private fb: FormBuilder,
    public _Register: RegisterService,
    private loadingController: LoadingController,
    public router: Router,
    private _login: LoginService,
    private _service: ServiciosGenerales,
    public alertController: AlertController,
    public toastController: ToastController,
    private _sActivate: ActivatedRoute
  ) {
    this.slideOpts = {
      allowTouchMove: false,
    };
  }
  setDataForms() {
    this.form.setValue({
      name: this.userRedesSociales.name,
      lastname: this.userRedesSociales.lastname,
    });

    this.form.setValue({ email: this.userRedesSociales.email });
    // console.log(form.value);
  }
  form: FormGroup;
  form2: FormGroup;
  form3: FormGroup;

  form4 = new FormGroup({
    departamento: new FormControl("", [Validators.required]),
    provincia: new FormControl("", [Validators.required]),
    distrito: new FormControl("", [Validators.required]),
  });
  departamento;
  ngOnInit() {
    /*   this.form4.get("departamento").setValue(0); */
    this.getDepartamentos();
    this.getProvincias();
    this.getDistritos();

    /*     this._Register.getDepartamento().subscribe(
      (res: any) => {
        this.departamento = res;
      },
      (error) => {}
    );
 */
    console.log(localStorage.getItem("email"));
    this.form = this.fb.group({
      email: [
        localStorage.getItem("email"),

        [
          Validators.required,
          Validators.email,
          Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$"),
        ],
      ],
      password: ["", Validators.required],
    });

    this.form2 = this.fb.group({
      name: ["", [Validators.required]],
      lastname: ["", [Validators.required]],
    });

    this.form3 = this.fb.group({
      dni: ["", [Validators.required]],
      sexo: ["", [Validators.required]],
    });

    let user = this._login.userRedesSociales;
    if (user) {
      this.userRedesSociales = user;
      this.setDataForms();
      console.log(user);
    }
  }

  /*  provincia;
  getProvincia(e) {
    console.log('llego', e);
    // this.getDistrito(this.forma.get('prov_id').value);

    this._Register.getProvincia(e.detail.value).subscribe(
      (dataprov) => {
        this.provincia = dataprov;
      },
      (error) => {
        this.presentToast('Debes seleccionar un departamento');
        return;
      }
    );
  }
  distrito;
  getDistrito(e) {
    console.log('llego', e);

    this._Register.getDistrito(e.detail.value).subscribe(
      (datadis) => {
        this.distrito = datadis;
      },
      (error) => {
        this.presentToast('Debes seleccionar una provincia');
        return;
      }
    );
  }
 */
  cleanPass() {
    this.form.get("password").reset();
    this.form4.get("passwordc").reset();
  }
  async save() {
    if (
      this.form4.get("departamento").value == "" ||
      this.form4.get("departamento").value == undefined ||
      this.form4.get("departamento").value == null
    ) {
      this.presentToast("Debe seleccionar un departamento");
      return;
    }

    if (
      this.form4.get("provincia").value == "" ||
      this.form4.get("provincia").value == undefined ||
      this.form4.get("provincia").value == null
    ) {
      this.presentToast("Debe seleccionar una provincia");
      return;
    }

    if (
      this.form4.get("distrito").value == "" ||
      this.form4.get("distrito").value == undefined ||
      this.form4.get("distrito").value == null
    ) {
      this.presentToast("Debe seleccionar un distrito");
      return;
    } else {
      const loading = await this.presentLoading();
      let FormUser = {
        name: this.form2.get("name").value,
        lastname: this.form2.get("lastname").value,
        dni: this.form3.get("dni").value,
        email: this.dataCorreo,
        date_of_birth: "2006-12-10",
        cellphone: "999999999",
        sexo: this.form3.get("sexo").value,
        password: this.form.get("password").value,
        region_id: this.form4.get("departamento").value,
        prov_id: this.form4.get("provincia").value,
        distrito_id: this.form4.get("distrito").value,
      };

      this._Register.RegistrarUser(FormUser).subscribe(
        async (response) => {
          localStorage.setItem("email", this.form.get("email").value);
          localStorage.setItem("pass", this.form.get("password").value);

          this.form.reset();
          this.form2.reset();
          this.form3.reset();
          const toast = await this.toastController.create({
            message: response,
            duration: 4000,
          });
          toast.present();

          loading.dismiss();
          this.router.navigateByUrl("/validation");
        },
        async (error) => {
          loading.dismiss();

          if (error.error.errors[0].msg == "No puede ser vacio") {
            const toast = await this.toastController.create({
              message: "El campo nombre y apellidos no puede estar vacío.",
              duration: 4000,
            });
            toast.present();
          }

          if (error.error.errors[0].msg == "Se require un email") {
            const toast = await this.toastController.create({
              message: "Se requiere un email.",
              duration: 4000,
            });
            toast.present();
          }

          if (error.error.errors[0].msg == "Ya existe el email") {
            const toast = await this.toastController.create({
              message:
                "El correo ya se encuentra registrado, ingrese un correo diferente e intente nuevamente.",
              duration: 4000,
            });
            toast.present();
          }

          if (error.error.errors[0].msg == "Se require un date") {
            const toast = await this.toastController.create({
              message: "Ingrese fecha de nacimiento.",
              duration: 4000,
            });
            toast.present();
          }

          if (error.error.errors[0].msg == "Se require el DNI") {
            const toast = await this.toastController.create({
              message: "Ingrese su DNI.",
              duration: 4000,
            });
            toast.present();
          }

          if (
            error.error.errors[0].msg ==
            "Se requiere al menos un numero y un caracter especial"
          ) {
            const toast = await this.toastController.create({
              message:
                "Ingrese un caracter en Mayuscula, un número y un caracter especial.",
              duration: 4000,
            });
            toast.present();
          }

          if (error.error.errors[0].msg == "Debe ser 9 numeros") {
            const toast = await this.toastController.create({
              message: "Ingrese nueve digitos en el campo celular.",
              duration: 4000,
            });
            toast.present();
          }

          if (error.status === 401) {
            const toast = await this.toastController.create({
              message: error.error.errors[0].msg,
              duration: 4000,
            });
            toast.present();
            this._service.signout();
          }
          loading.dismiss();
        }
      );
    }
  }

  async presentLoading(message: string = "Guardando.....") {
    if (this.form !== null) {
      const loading = await this.loadingController.create({
        cssClass: "",
        message,
      });
      await loading.present();
      return loading;
    }
  }

  async verificarTreeForm(slide: IonSlides) {
    if (
      this.form3.get("dni").value == "" ||
      this.form3.get("dni").value == undefined ||
      this.form3.get("dni").value == null ||
      this.form3.get("dni").value.length < 8
    ) {
      this.presentToast("Debe ingresar un DNI");
      return;
    }

    if (
      this.form3.get("sexo").value == "" ||
      this.form3.get("sexo").value == undefined ||
      this.form3.get("sexo").value == null
    ) {
      this.presentToast("Debe ingresar su sexo");
      return;
    }

    const loading = await this.presentLoading("Verificando...");

    slide.lockSwipes(false);

    slide.slideNext();
    loading.dismiss();
  }

  async verificarOneForm(slide: IonSlides) {
    if (
      this.form.get("email").value == "" ||
      this.form.get("email").value == undefined ||
      this.form.get("email").value == null ||
      this.form.get("email").invalid
    ) {
      this.presentToast("Debe ingresar un email valido");
      return;
    }

    if (
      this.form.get("password").value == "" ||
      this.form.get("password").value == undefined ||
      this.form.get("password").value == null
    ) {
      this.presentToast("Debe ingresar una contraseña valida");
      return;
    }
    const regex = new RegExp(
      /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/
    );

    if (regex.test(this.form.get("password").value) == false) {
      this.presentToast(
        "Se requiere al menos un numero y un caracter especial"
      );
      return;
    }
    const loading = await this.presentLoading("Verificando...");

    slide.lockSwipes(false);
    this.dataCorreo = this.form.get("email").value;
    slide.slideNext();
    loading.dismiss();
  }

  async verificarTwoForm(slide: IonSlides) {
    if (
      this.form2.get("name").value == "" ||
      this.form2.get("name").value == undefined ||
      this.form2.get("name").value == null
    ) {
      this.presentToast("Debe ingresar un nombre");
      return;
    }
    if (
      this.form2.get("lastname").value == "" ||
      this.form2.get("lastname").value == undefined ||
      this.form2.get("lastname").value == null
    ) {
      this.presentToast("Debe ingresar un apellido");
      return;
    }

    const name = this.form2.get("name").value;
    const lastname = this.form2.get("lastname").value;
    const nameArr: Array<string> = name.split("");
    const lastNameAr: Array<string> = lastname.split("");
    let salir = false;
    nameArr.forEach((element) => {
      const charCode = element.charCodeAt(0);
      if (charCode > 31 && (charCode < 33 || charCode > 64)) {
      } else {
        this.presentToast(
          "El NOMBRE no debe contener números ni caracteres especiales."
        );
        salir = true;
      }
    });
    lastNameAr.forEach((element) => {
      const charCode2 = element.charCodeAt(0);
      if (charCode2 > 31 && (charCode2 < 33 || charCode2 > 64)) {
      } else {
        this.presentToast(
          "El APELLIDO no debe contener números ni caracteres especiales."
        );
        salir = true;
      }
    });
    if (salir) {
      return;
    }

    const loading = await this.presentLoading("Verificando...");

    slide.lockSwipes(false);

    slide.slideNext();
    loading.dismiss();
  }

  async presentToast(m) {
    const toast = await this.toastController.create({
      message: m,
      duration: 2000,
    });
    toast.present();
  }

  dataCorreo;

  volverLogin() {
    this.form.reset();
    this.form2.reset();
    this.form3.reset();
    this.form4.reset();
    this.router.navigate(["/login"]);
  }

  numberOnly(event): boolean {
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }
  formSubmitted = false;
  customYearValues = [2006, 1970];

  lettersOnly(event): boolean {
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 33 || charCode > 64)) {
      return true;
    }
    return false;
  }

  departamentos: Array<any>;
  provincias: Array<any>;
  distritos: Array<any>;

  getDepartamentos() {
    this._Register.getDepartamento().subscribe((data1) => {
      // console.log(data1.data);
      this.departamentos = data1;
      console.log(data1, "depa");
    });
  }

  getProvincias() {
    console.log("holaaa", this.form4.get("departamento").value);
    this.form4.get("provincia").setValue(0);
    this.form4.get("distrito").setValue(0);
    this._Register
      .getProvincia(this.form4.get("departamento").value)
      .subscribe((data2) => {
        // console.log(data2.data);
        this.provincias = data2;
      });
  }

  getDistritos() {
    console.log(this.form4.get("distrito").setValue(0), "2312321");
    this.form4.get("distrito").setValue(0);
    this._Register
      .getDistrito(this.form4.get("provincia").value)
      .subscribe((data3) => {
        // console.log(data3.data);
        this.distritos = data3;
      });
  }
}
