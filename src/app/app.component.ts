import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { MenuController, ModalController, Platform } from "@ionic/angular";
import { EditperfilComponent } from "./components/editperfil/editperfil.component";
import { ComponentsService } from "./components/services/components.service";
import { ServiciosGenerales } from "./components/services/servicios-generales.service";
import { OneSignal } from "@ionic-native/onesignal/ngx";

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
    private _sMenu: MenuController,
    private oneSignal: OneSignal
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

  onseSignalAppId: string = "745e92d8-31fb-47ed-9315-b3ff0e90528e";
  googleProjectId: string = "239683653001";
  iniciarApp() {
    this.oneSignal.startInit(this.onseSignalAppId, this.googleProjectId);
    console.log(
      this.oneSignal.startInit(this.onseSignalAppId, this.googleProjectId)
    );
    this.oneSignal.inFocusDisplaying(
      this.oneSignal.OSInFocusDisplayOption.InAppAlert
    );
    this.oneSignal.handleNotificationReceived().subscribe(() => {
      // do something when notification is received
    });
    this.oneSignal.handleNotificationOpened().subscribe(() => {
      // do something when a notification is opened
    });
    this.oneSignal.endInit();
  }
}
