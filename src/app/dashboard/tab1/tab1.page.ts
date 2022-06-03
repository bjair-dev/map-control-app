import {
  Component,
  ElementRef,
  Inject,
  Input,
  Renderer2,
  ViewChild,
} from "@angular/core";
import {
  AlertController,
  ModalController,
  Platform,
  ToastController,
} from "@ionic/angular";
import { ServiciosGenerales } from "src/app/components/services/servicios-generales.service";
import { EditperfilComponent } from "src/app/components/editperfil/editperfil.component";
import { ModalInforComponent } from "src/app/components/modal-infor/modal-infor.component";
import { ComponentsService } from "src/app/components/services/components.service";
import { Subscription } from "rxjs";
import { CommentService } from "src/app/components/services/comments.service";
import { MapsAPILoader, MouseEvent } from "@agm/core";
import { LatLngLiteral } from "@agm/core/services/google-maps-types";
import { HttpUrlEncodingCodec } from "@angular/common/http";
declare var google: any;

interface marker {
  lat: number;
  lng: number;
  label?: string;
  draggable: boolean;
}
@Component({
  selector: "app-tab1",
  templateUrl: "tab1.page.html",
  styleUrls: ["tab1.page.scss"],
})
export class Tab1Page {
  @Input() isModal;

  constructor(
    public modalController: ModalController,
    public _sGenerales: ServiciosGenerales,
    private alertController: AlertController,
    private _sToast: ToastController,
    private renderer: Renderer2,
    public mapsApiLoader: MapsAPILoader,
    private _sComponents: ComponentsService,
    private platform: Platform,
    private _sComments: CommentService
  ) {
    this._sGenerales.getProfile();
    this._sGenerales.actualizarPerfil.subscribe(() => {
      this._sGenerales.getProfile();
    });
    this.mapsApiLoader.load().then(() => {
      this.geocoder = new google.maps.Geocoder();
      console.log(this.geocoder, "geo");
    });
  }

  async abrirPerfil() {
    const modal = await this.modalController.create({
      component: EditperfilComponent,
      cssClass: "my-custom-class",
    });
    return await modal.present();
  }

  async abrirInfo() {
    this._sComponents.openModal = true;
    const modal = await this.modalController.create({
      component: ModalInforComponent,
      cssClass: "video-modal",
      componentProps: {
        latitud: this.lat,
        longitud: this.lng,
        direccion: this.direccion,
      },
    });
    modal.onDidDismiss().then((data) => {
      this.getComments(this.direccion);
    });
    return await modal.present();
  }

  ngOnInit(): void {
    this.obtenerUbi();
    this.getColoresMapa();
  }
  comments;
  colorMap;
  color;

  getColoresMapa() {
    this._sComments.getColoresMapa().subscribe(
      (data) => {
        this.colorMap = data;
        console.log(data);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getComments(dirf) {
    this._sComments.getComments(dirf).subscribe(
      (data) => {
        this.comments = data;
        console.log("comentario", data);
      },
      (error) => {
        console.log(error);
        // console.log(error);
      }
    );
  }

  zoom: number = 18;

  clickedMarker(label: string, index: number) {
    console.log(`clicked the marker: ${label || index}`);
  }

  mapClicked($event: MouseEvent) {
    console.log($event);

    this.markers.push({
      lat: $event.coords.lat,
      lng: $event.coords.lng,
      draggable: true,
    });
  }
  geocoder: any;

  findAddressByCoordinates() {
    this.geocoder.geocode(
      {
        location: {
          lat: this.lat,
          lng: this.lng,
        },
      },
      (results, status) => {
        console.log(results, "0");
        /*  this.onAutocompleteSelected(results[0]); */
      }
    );
  }

  markerDragEnd(m: marker, $event: MouseEvent) {
    console.log("dragEnd", m, $event);
  }

  markers: marker[] = [];

  lat: number = 0;
  lng: number = 0;
  direccion: any;
  valorNuevo;
  obtenerUbi() {
    if (navigator && navigator.geolocation.getCurrentPosition) {
      const position = (pos) => {
        console.log(pos, "data de posicion");
        this.lng = pos.coords.longitude;
        this.lat = pos.coords.latitude;

        this.valorNuevo = "Latitud: " + this.lat + " Longitud: " + this.lng;
        this.geocoder.geocode(
          {
            location: {
              lat: pos.coords.latitude,
              lng: pos.coords.longitude,
            },
          },
          (results, status) => {
            console.log(results);
            this.direccion = results[3].formatted_address;
            let cargo = this.direccion;

            this.getComments(cargo);
            console.log(status, "0");
            /*  this.onAutocompleteSelected(results[0]); */
          }
        );
      };

      const error = (error) => {
        console.log(error);

        alert(JSON.stringify(error));
      };

      // navigator.geolocation.getCurrentPosition( position, error );
      navigator.geolocation.getCurrentPosition(position, error);
    }
  }
}
