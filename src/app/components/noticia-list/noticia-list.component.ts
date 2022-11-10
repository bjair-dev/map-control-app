import { Component, OnInit } from "@angular/core";
import { ServiciosGenerales } from "../services/servicios-generales.service";

@Component({
  selector: "app-noticia-list",
  templateUrl: "./noticia-list.component.html",
  styleUrls: ["./noticia-list.component.scss"],
})
export class NoticiaListComponent implements OnInit {
  constructor(public _sGenerales: ServiciosGenerales) {}

  ngOnInit() {
    this.getNoticias();
  }
  noticias;
  getNoticias() {
    this._sGenerales
      .getNoticias(this._sGenerales.user.code_departamento)
      .subscribe(
        (data) => {
          this.noticias = data;
          console.log("noticias", data);
        },
        (error) => {
          console.log(error);
          // console.log(error);
        }
      );
  }
}
