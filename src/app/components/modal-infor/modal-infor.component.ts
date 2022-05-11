import { Component, Input, OnInit } from "@angular/core";
import { ModalController, ToastController } from "@ionic/angular";
import { CommentService } from "../services/comments.service";

@Component({
  selector: "app-modal-infor",
  templateUrl: "./modal-infor.component.html",
  styleUrls: ["./modal-infor.component.scss"],
})
export class ModalInforComponent implements OnInit {
  constructor(
    private _sModal: ModalController,
    public toastController: ToastController,
    private _sComments: CommentService
  ) {
    this.califica = "1";
    this.reporta = "2";
  }
  califica;
  reporta;

  @Input() latitud;
  @Input() longitud;
  @Input() direccion;
  ngOnInit() {
    console.log(this.latitud, "obtiene de la base");
    console.log(this.longitud, "obtiene de la base");
    console.log(this.direccion, "obtiene de la base");
  }

  apareceNegativo = false;
  aparecePositivo = false;
  actualizarTipo(e) {
    if (e.detail.value == "reportneg") {
      this.apareceNegativo = true;
      this.aparecePositivo = false;
    }
    if (e.detail.value == "reportpos") {
      this.aparecePositivo = true;
      this.apareceNegativo = false;
      this.apareceComentarioNega = false;
    }
  }
  apareceComentarioNega;
  actualizarTipoNegativo(e) {
    console.log(e.detail.value);

    if (
      e.detail.value == "asesinato" ||
      e.detail.value == "robo" ||
      e.detail.value == "violacion"
    ) {
      this.apareceComentarioNega = true;
    }
  }

  close() {
    this._sModal.dismiss();
  }

  async presentToast(m) {
    const toast = await this.toastController.create({
      message: m,
      duration: 2000,
    });
    toast.present();
  }

  comentPositivo;
  comentNegativo;
  motivoReporte;
  guardarComentario() {
    let data = {
      coment_text: null,
      direct_map: this.direccion,
      lat_direccion: this.latitud,
      long_direccion: this.longitud,
      coment_calificacion: null,
      coment_motivo: null,
    };

    if (this.aparecePositivo == true) {
      data.coment_text = this.comentPositivo;
      data.coment_calificacion = "Califica";
      data.coment_motivo = "Positivo";
    }
    if (this.apareceNegativo == true) {
      data.coment_text = this.comentNegativo;
      data.coment_calificacion = "Reporte";
      data.coment_motivo = this.motivoReporte;
    }
    console.log(data);

    this._sComments.postComentario(data).subscribe(
      (resp) => {
        console.log(resp);

        this._sModal.dismiss();
        this.presentToast("Comentario registrado");
        return;
      },
      (error) => {
        this.presentToast("Debes ingresar un motivo, Intenta nuevamente");
        return;
      }
    );
  }
}
