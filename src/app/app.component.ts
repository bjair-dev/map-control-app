import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { MenuController, ModalController, Platform } from "@ionic/angular";
import { EditperfilComponent } from "./components/editperfil/editperfil.component";
import { ComponentsService } from "./components/services/components.service";
import { ServiciosGenerales } from "./components/services/servicios-generales.service";

@Component({
  selector: "app-root",
  templateUrl: "app.component.html",
  styleUrls: ["app.component.scss"],
})
export class AppComponent {
  constructor(
    public _sGenerales: ServiciosGenerales,
    private _sComponents: ComponentsService,
    private platform: Platform,
    private router: Router,
    public modalController: ModalController,
    private _sMenu: MenuController
  ) {}

  logout() {
    this._sComponents.openModal = true;
    this._sGenerales.signout();
  }

  async editarPerfil() {
    this._sMenu.close();
    this._sComponents.openModal = true;
    const modal = await this.modalController.create({
      component: EditperfilComponent,
    });
    return await modal.present();
  }

  abreNoticia() {
    this._sMenu.close();
    this._sComponents.openModal = true;
    this.router.navigate(["/dashboard/home/noticias"]);
  }
}
