import {
  Component,
  ElementRef,
  HostListener,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  AlertController,
  ModalController,
  Platform,
  ToastController,
} from '@ionic/angular';
import { ServiciosGenerales } from 'src/app/components/services/servicios-generales.service';
import { EditperfilComponent } from 'src/app/components/editperfil/editperfil.component';
import { ModalInforComponent } from 'src/app/components/modal-infor/modal-infor.component';
import { ComponentsService } from 'src/app/components/services/components.service';
import { Subscription } from 'rxjs';
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
  @Input() isModal;

  @ViewChild('map', { static: false }) mapElement: ElementRef;
  map: any;
  address: string;

  latitude: number;
  longitude: number;
  constructor(
    public modalController: ModalController,
    public _sGenerales: ServiciosGenerales,
    private alertController: AlertController,
    private _sToast: ToastController,

    private _sComponents: ComponentsService,
    private platform: Platform
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
  }

  ngOnDestroy(): void {}

  /* loadMap() {
    this.geolocation
      .getCurrentPosition()
      .then((resp) => {
        this.latitude = resp.coords.latitude;
        this.longitude = resp.coords.longitude;

        let latLng = new google.maps.LatLng(
          resp.coords.latitude,
          resp.coords.longitude
        );
        let mapOptions = {
          center: latLng,
          zoom: 15,
          mapTypeId: google.maps.MapTypeId.ROADMAP,
        };

        this.getAddressFromCoords(resp.coords.latitude, resp.coords.longitude);

        this.map = new google.maps.Map(
          this.mapElement.nativeElement,
          mapOptions
        );

        this.map.addListener('dragend', () => {
          this.latitude = this.map.center.lat();
          this.longitude = this.map.center.lng();

          this.getAddressFromCoords(
            this.map.center.lat(),
            this.map.center.lng()
          );
        });
      })
      .catch((error) => {
        console.log('Error getting location', error);
      });
  }

  getAddressFromCoords(lattitude, longitude) {
    console.log('getAddressFromCoords ' + lattitude + ' ' + longitude);
    let options: NativeGeocoderOptions = {
      useLocale: true,
      maxResults: 5,
    };

    this.nativeGeocoder
      .reverseGeocode(lattitude, longitude, options)
      .then((result: NativeGeocoderResult[]) => {
        this.address = '';
        let responseAddress = [];
        for (let [key, value] of Object.entries(result[0])) {
          if (value.length > 0) responseAddress.push(value);
        }
        responseAddress.reverse();
        for (let value of responseAddress) {
          this.address += value + ', ';
        }
        this.address = this.address.slice(0, -2);
      })
      .catch((error: any) => {
        this.address = 'Address Not Available!';
      });
  } */

  // loadMap() {
  //   // create a new map by passing HTMLElement
  //   const mapEle: HTMLElement = document.getElementById('map');
  //   // create LatLng object -13.075416, -76.378901

  //   const myLatLng = { lat: -13.075416, lng: -76.378901 };
  //   // create map
  //   this.map = new google.maps.Map(mapEle, {
  //     center: myLatLng,
  //     zoom: 15,
  //   });

  //   google.maps.event.addListenerOnce(this.map, 'idle', () => {
  //     this.renderMarkers();
  //     mapEle.classList.add('show-map');
  //   });
  // }

  // renderMarkers() {
  //   this.markers.forEach((marker) => {
  //     this.addMarker(marker);
  //   });
  // }

  // addMarker(marker: Marker) {
  //   return new google.maps.Marker({
  //     position: marker.position,
  //     map: this.map,
  //     title: marker.title,
  //   });
  // }
  // async presentToast(m) {
  //   const toast = await this._sToast.create({
  //     message: m,
  //     duration: 3000,
  //   });
  //   toast.present();
  // }

  

}
