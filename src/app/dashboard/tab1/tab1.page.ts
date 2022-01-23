import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { ServiciosGenerales } from 'src/app/components/services/servicios-generales.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page implements OnInit, OnDestroy {
  constructor(public _sGenerales: ServiciosGenerales) {
    this._sGenerales.getProfile();
  }

  ngOnInit() {}

  @HostListener('unloaded')
  ngOnDestroy(): void {
    console.log('Destroy');
    // throw new Error('Method not implemented.');
  }
}
