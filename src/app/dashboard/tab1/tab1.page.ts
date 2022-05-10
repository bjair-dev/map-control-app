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
import { MouseEvent } from "@agm/core";
import { LatLngLiteral } from "@agm/core/services/google-maps-types";

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
      cssClass: "my-custom-class",
    });
    return await modal.present();
  }

  async abrirInfo() {
    this._sComponents.openModal = true;
    const modal = await this.modalController.create({
      component: ModalInforComponent,
      cssClass: "video-modal",
    });
    return await modal.present();
  }

  ngOnInit(): void {
    this.obtenerUbi();
  }

  comments;
  getComments() {
    this._sComments.getComments().subscribe(
      (data) => {
        this.comments = data;
      },
      (error) => {
        console.log(error);
        // console.log(error);
      }
    );
  }

  z; // google maps zoom level
  zoom: number = 8;

  // initial center position for the map
  /*   lat: number = 51.673858;
  lng: number = 7.815982; */

  clickedMarker(label: string, index: number) {
    console.log(`clicked the marker: ${label || index}`);
  }

  mapClicked($event: MouseEvent) {
    this.markers.push({
      lat: $event.coords.lat,
      lng: $event.coords.lng,
      draggable: true,
    });
  }

  markerDragEnd(m: marker, $event: MouseEvent) {
    console.log("dragEnd", m, $event);
  }

  markers: marker[] = [
    {
      lat: 51.673858,
      lng: 7.815982,
      label: "A",
      draggable: true,
    },
    {
      lat: 51.373858,
      lng: 7.215982,
      label: "B",
      draggable: false,
    },
    {
      lat: 51.723858,
      lng: 7.895982,
      label: "C",
      draggable: true,
    },
  ];

  lat: number = 0;
  lng: number = 0;

  obtenerUbi() {
    if (navigator && navigator.geolocation.getCurrentPosition) {
      const position = (pos) => {
        console.log(pos, "data de posicion");
        this.lng = pos.coords.longitude;
        this.lat = pos.coords.latitude;
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

// just an interface for type safety.
interface marker {
  lat: number;
  lng: number;
  label?: string;
  draggable: boolean;
}
