import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ServiciosGenerales } from '../services/servicios-generales.service';

@Component({
  selector: 'app-editperfil',
  templateUrl: './editperfil.component.html',
  styleUrls: ['./editperfil.component.scss'],
})
export class EditperfilComponent implements OnInit, OnDestroy {
  constructor(
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
  }
}
