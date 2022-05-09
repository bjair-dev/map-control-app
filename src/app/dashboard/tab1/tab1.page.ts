import {
  Component,
  ElementRef,
  Inject,
  Input,
  Renderer2,
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

import { Plugins } from '@capacitor/core';
import { GooglemapsService } from './servicemaps/google.maps.service';
import { DOCUMENT } from '@angular/common';
import { CommentService } from 'src/app/components/services/comments.service';
const {Geolocation} = Plugins;

declare var google: any;


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
export class Tab1Page  {
  @Input() isModal;

  enableBackdropDismiss = false;
  showBackdrop = false;
  shouldPropagate = false;



  constructor(
    public modalController: ModalController,
    public _sGenerales: ServiciosGenerales,
    private alertController: AlertController,
    private _sToast: ToastController,
    private renderer: Renderer2,
    @Inject(DOCUMENT) private document,
    private googlemapsService: GooglemapsService,
    private _sComponents: ComponentsService,
    private platform: Platform,
    private _sComments: CommentService
  ) {
    this._sGenerales.getProfile();
    this.getComments();
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



// coordenadas cuenca
@Input() position = {  
  lat: -2.898116,
  lng: -78.99958149999999
};

label = {
  titulo:'Ubicación',
  subtitulo: 'Mi ubicación de envío'
} 

map: any;
marker: any;
infowindow: any;
positionSet: any





ngOnInit(): void {
  this.init();

  console.log('position ->', this.position)
}

async init() {

  this.googlemapsService.init(this.renderer, this.document).then( () => {
        this.initMap();
  }).catch( (err) => {    
        console.log(err);
  });
  
}



@ViewChild('map') divMap: ElementRef;

initMap() {

  const position = this.position;

  let latLng = new google.maps.LatLng(position.lat, position.lng);

  let mapOptions = {
        center: latLng,
        zoom: 15,
        disableDefaultUI: true,
        clickableIcons: false,
  };

  this.map = new google.maps.Map(this.divMap.nativeElement, mapOptions);
  this.marker = new google.maps.Marker({
        map: this.map,
        animation: google.maps.Animation.DROP,
        draggable: false,
  });
  this.clickHandleEvent();
  this.infowindow = new google.maps.InfoWindow();
  this.addMarker(position);
  this.setInfoWindow(this.marker, this.label.titulo, this.label.subtitulo);

}

clickHandleEvent() {

  this.map.addListener('click', (event: any) => {
        const position = {
              lat: event.latLng.lat(),
              lng: event.latLng.lng(),
        };
        this.addMarker(position);
  });

}



addMarker(position: any): void {

  let latLng = new google.maps.LatLng(position.lat, position.lng);

  this.marker.setPosition(latLng);
  this.map.panTo(position);
  this.positionSet = position;

}


setInfoWindow(marker: any, titulo: string, subtitulo: string) {

  const contentString  =  '<div id="contentInsideMap">' +
                          '<div>' +
                          '</div>' +
                          '<p style="font-weight: bold; margin-bottom: 5px;">' + titulo + '</p>' +
                          '<div id="bodyContent">' +
                          '<p class"normal m-0">'
                          + subtitulo + '</p>' +
                          '</div>' +
                          '</div>';
  this.infowindow.setContent(contentString);
  this.infowindow.open(this.map, marker);

}

async mylocation() {

console.log('mylocation() click')

Geolocation.getCurrentPosition().then((res) => {

  console.log('mylocation() -> get ', res);

  const position = {
        lat: res.coords.latitude,
        lng: res.coords.longitude,
  }
  this.addMarker(position);

});

}

aceptar() {
  console.log('click aceptar -> ', this.positionSet);
  this.modalController.dismiss({pos: this.positionSet})
}

  
comments
getComments() {
  this._sComments.getComments().subscribe(
    (data ) => {
   
      this.comments = data;
   
    },
    (error) => {
    console.log(error)
      // console.log(error);
    }
  );
}


}
