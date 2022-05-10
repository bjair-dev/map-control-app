import { Component, OnInit } from "@angular/core";
import { ModalController } from "@ionic/angular";

@Component({
  selector: "app-modal-infor",
  templateUrl: "./modal-infor.component.html",
  styleUrls: ["./modal-infor.component.scss"],
})
export class ModalInforComponent implements OnInit {
  constructor(private _sModal: ModalController) {
    this.califica = "1";
    this.reporta = "2";
  }
  califica;
  reporta;
  ngOnInit() {}

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
      e.detail.value == "viola"
    ) {
      this.apareceComentarioNega = true;
    }
  }

  close() {
    this._sModal.dismiss();
  }

  enableBackdropDismiss = false;
  showBackdrop = false;
  shouldPropagate = false;
}
