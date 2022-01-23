import { Component } from '@angular/core';
import { ComponentsService } from './components/services/components.service';
import { ServiciosGenerales } from './components/services/servicios-generales.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
    public _sGenerales: ServiciosGenerales,
    private _sComponents: ComponentsService
  ) {
    this._sGenerales.getProfile();
  }

  logout() {
    this._sComponents.openModal = true;
    this._sGenerales.signout();
  }
}
