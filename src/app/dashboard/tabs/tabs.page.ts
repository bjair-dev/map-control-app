import { Component } from "@angular/core";
import { ServiciosGenerales } from "src/app/components/services/servicios-generales.service";

@Component({
  selector: "app-tabs",
  templateUrl: "tabs.page.html",
  styleUrls: ["tabs.page.scss"],
})
export class TabsPage {
  constructor(private _sGenerales: ServiciosGenerales) {
    this._sGenerales.getProfile();
  }
}
