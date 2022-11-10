import { Component, HostListener, OnDestroy, OnInit } from "@angular/core";
import { ModalController, ToastController } from "@ionic/angular";
import { TermConditionComponent } from "src/app/Login-Register/term-condition/term-condition.component";
import { environment } from "src/environments/environment";
import { ServiciosGenerales } from "../services/servicios-generales.service";

@Component({
  selector: "app-editperfil",
  templateUrl: "./editperfil.component.html",
  styleUrls: ["./editperfil.component.scss"],
})
export class EditperfilComponent implements OnInit {
  /* constructor(
    public _sGenerales: ServiciosGenerales,
    private _sModal: ModalController
  ) {
    this._sGenerales.getProfile();
  }

  ngOnInit() {}

  @HostListener('unloaded')
  ngOnDestroy(): void {
    console.log('Destroy');
  }
  close() {
    this._sModal.dismiss();
  } */

  dateUser;
  dateTemp;
  sexoTemp;
  sexoUser;
  depaUser;
  provUser;
  distUser;
  newpass;
  repeatnewpass;
  constructor(
    private _sModal: ModalController,
    public _sGenerales: ServiciosGenerales,
    private toastController: ToastController
  ) {
    // this.dateUser = '2021-12-2';
    let f = new Date(this._sGenerales.user.date_of_birth + " 12:00:00");
    let t = `${f.getFullYear()}-${f.getMonth() + 1}-${f.getDate()}`;
    this.dateUser = t;
    this.dateTemp = t;
    this.sexoUser = this._sGenerales.user.sexo;
    this.sexoTemp = this._sGenerales.user.sexo;
    this.depaUser = this._sGenerales.user.name_departamento;
    this.provUser = this._sGenerales.user.name_provincia;
    this.distUser = this._sGenerales.user.name_distrito;

    // this.dateUser = new Date(this._sGenerales.user.date_of_birth);
    // console.log(this.dateUser);
  }

  ngOnInit() {
    console.log(this.adjunto);
    if (this.adjunto == undefined) {
      this.adjunto = this._sGenerales.user.path;
    } else {
      this.adjunto = "";
    }
  }

  close() {
    this._sModal.dismiss();
  }

  actualizarPerfil() {
    let cont = 0;
    let obj: any = {};
    if (this.sexoUser !== this.sexoTemp) {
      // console.log('actualizar sexo usuario');
      obj.sexo = this.sexoUser;
    }
    if (this.dateTemp !== this.dateUser) {
      let f = new Date(this.dateUser);
      let t = `${f.getFullYear()}-${
        f.getMonth() + 1 < 10 ? `0${f.getMonth() + 1}` : f.getMonth() + 1
      }-${f.getDate() < 10 ? `0${f.getDate()}` : f.getDate() + 1}`;
      // console.log('actualizar fecha nacimiento');
      // console.log(t);
      obj.date_of_birth = t;
    }
    if (obj.date_of_birth != "" || obj.sexo != "") {
      cont++;
      this.actualizarUser(obj);
      this.ActualizarImg();
      this._sGenerales.getProfile();
      this._sGenerales.actualizarPerfil.emit();
      console.log("actualizar perfil");
    }
    if (
      this.newpass != "" &&
      this.newpass != undefined &&
      this.newpass != null
    ) {
      cont++;
      // console.log('actualizar pass');
      this.actualizarPassword();
    }

    if (cont == 0) {
      this.presentToast("No se realizó ningún cambio.");
    }
  }

  actualizarUser(obj) {
    this._sGenerales.updatePerfilUser(obj).subscribe(
      (resp) => {
        this.presentToast("Tus datos personales se actualizaron correctamente");
        /*         this.ActualizarImg();
         */

        // this._sModal.dismiss();
      },
      (error) => {
        // console.log(error.error.errors[0].msg);
        this.presentToast(error.error.errors[0].msg);
      }
    );
  }

  actualizarPassword() {
    // console.log(this.newpass);
    // console.log(this.repeatnewpass);
    if (
      this.newpass == "" ||
      this.newpass == undefined ||
      this.newpass == null
    ) {
      this.presentToast("Debe ingresar una contraseña");
      this.cleanPass();
      return;
    }
    if (
      this.repeatnewpass == "" ||
      this.repeatnewpass == undefined ||
      this.repeatnewpass == null
    ) {
      this.presentToast("Debe repetir la contraseña");
      this.cleanPass();
      return;
    }
    if (this.newpass !== this.repeatnewpass) {
      this.presentToast("Las contraseñas no son iguales.");
      this.cleanPass();
      return;
    } else {
      // console.log('iguales');
      this._sGenerales.updatePassword(this.newpass).subscribe(
        (resp) => {
          this.presentToast("Contraseña actualizada correctamente.");
          this.cleanPass();
          // this._sModal.dismiss();
        },
        (error) => {
          // console.log(error.error.errors[0].msg);
          this.presentToast(error.error.errors[0].msg);
          this.cleanPass();
        }
      );
    }
  }

  cleanPass() {
    this.newpass = "";
    this.repeatnewpass = "";
  }

  async presentToast(m) {
    const toast = await this.toastController.create({
      message: m,
      duration: 2000,
    });
    toast.present();
  }

  async verTerminos() {
    const modal = await this._sModal.create({
      component: TermConditionComponent,
      cssClass: "my-custom-class",
      componentProps: {
        isModal: true,
      },
    });
    return await modal.present();
  }

  adjunto;
  adjunto2;
  workback;
  nombreImg;
  aparece;
  image;
  cambioImagen1 = false;
  editMode = false;
  incluirImagen = false;
  image2;
  /*  cancelarCambioImg() {
    this.cambioImagen1 = false;
    // this.image = null;
    this.image = this.DatosTips.path;
    this.nombreImg = this.DatosTips.key;
  } */

  changeListener($event): void {
    console.log("no");
    this.readThis($event.target);
  }

  verImagen() {
    this.aparece = false;
    this.image = true;
  }

  async readThis(inputValue: any) {
    var file: File = inputValue.files[0];
    this.nombreImg = inputValue.files[0].name;

    var myReader1: FileReader = new FileReader();
    var mimeType1 = file.type;
    if (mimeType1.match(/image\/*/) == null) {
      //
      const toast = await this.toastController.create({
        message: "Imagen cambiada.",
        duration: 4000,
      });
      return;
    }

    this.verImagen();

    myReader1.onloadend = (e) => {
      this.image = myReader1.result;

      this.adjunto = <string>myReader1.result;
      this.adjunto2 = <string>myReader1.result;

      /*       this.adjunto = myReader.result.split('base64,').pop(); */
    };
    myReader1.readAsDataURL(file);
  }

  ActualizarImg() {
    if (this.adjunto) {
      this.workback = true;

      this._sGenerales.updatePerfilImage({ image: this.adjunto }).subscribe(
        (response: any) => {
          /*       this.noticias[this.DatosTipsindex].path = response.path; */
          this.adjunto = null;
          this.adjunto2 = null;
          this.workback = false;
        },
        (error) => {
          this.workback = false;
        }
      );
    }
  }
}
