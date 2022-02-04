import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ServiciosGenerales } from 'src/app/components/services/servicios-generales.service';
import { EditperfilComponent } from 'src/app/components/editperfil/editperfil.component';
import { ModalInforComponent } from 'src/app/components/modal-infor/modal-infor.component';
import { ComponentsService } from 'src/app/components/services/components.service';
declare var google;
interface Marker {
  position: {
    lat: number;
    lng: number;
  };
  title: string;
}
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page implements OnInit, OnDestroy {
  constructor(
    public modalController: ModalController,
    public _sGenerales: ServiciosGenerales,
    private _sComponents: ComponentsService
  ) {
    this._sGenerales.getProfile();
  }

  async abrirPerfil() {
    const modal = await this.modalController.create({
      component: EditperfilComponent,
      cssClass: 'my-custom-class',
    });
    return await modal.present();
  }

  async abrirInfo() {
    this._sComponents.openModal = true;
    const modal = await this.modalController.create({
      component: ModalInforComponent,
      cssClass: 'video-modal',
    });
    return await modal.present();
  }

  map = null;
  markers: Marker[] = [
    {
      position: {
        lat: 4.658383846282959,
        lng: -74.09394073486328,
      },
      title: 'Parque Simón Bolivar',
    },
    {
      position: {
        lat: 4.667945861816406,
        lng: -74.09964752197266,
      },
      title: 'Jardín Botánico',
    },
    {
      position: {
        lat: 4.676802158355713,
        lng: -74.04825592041016,
      },
      title: 'Parque la 93',
    },
    {
      position: {
        lat: 4.6554284,
        lng: -74.1094989,
      },
      title: 'Maloka',
    },
  ];
  ngOnInit() {
    this.loadMap();
  }

  @HostListener('unloaded')
  ngOnDestroy(): void {
    console.log('Destroy');
  }

  loadMap() {
    // create a new map by passing HTMLElement
    const mapEle: HTMLElement = document.getElementById('map');
    // create LatLng object -13.075416, -76.378901

    const myLatLng = { lat: -13.075416, lng: -76.378901 };
    // create map
    this.map = new google.maps.Map(mapEle, {
      center: myLatLng,
      zoom: 15,
    });

    google.maps.event.addListenerOnce(this.map, 'idle', () => {
      this.renderMarkers();
      mapEle.classList.add('show-map');
    });
  }

  renderMarkers() {
    this.markers.forEach((marker) => {
      this.addMarker(marker);
    });
  }

  addMarker(marker: Marker) {
    return new google.maps.Marker({
      position: marker.position,
      map: this.map,
      title: marker.title,
    });
  }
}
