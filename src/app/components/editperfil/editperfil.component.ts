import { Component, HostListener, OnDestroy, OnInit } from "@angular/core";
import { ModalController, ToastController } from "@ionic/angular";
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
    // this.dateUser = new Date(this._sGenerales.user.date_of_birth);
    // console.log(this.dateUser);
  }

  ngOnInit() {}

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
      }-${f.getDate() < 10 ? `0${f.getDate()}` : f.getDate() - 1}`;
      // console.log('actualizar fecha nacimiento');
      // console.log(t);
      obj.date_of_birth = t;
    }
    if (obj.date_of_birth != "" || obj.sexo != "") {
      cont++;
      this.actualizarUser(obj);
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
        this._sGenerales.getProfile();
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
    /*   const modal = await this._sModal.create({
      component: TermsConditionsComponent,
      cssClass: "my-custom-class",
      componentProps: {
        isModal: true,
      },
    });
    return await modal.present(); */
  }
}
