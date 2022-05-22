import { Injectable } from "@angular/core";
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
  HttpParams,
} from "@angular/common/http";

import { Observable, throwError } from "rxjs";
import { retry, catchError } from "rxjs/operators";
import { environment } from "../../../environments/environment";

@Injectable({
  providedIn: "root",
})
export class RegisterService {
  URL_BACKEND = environment.BACKEND_URL;
  constructor(private http: HttpClient) {}
  // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    }),
  };
  //OBTENER Rubros

  RegistrarUser(customer): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.set("Content-type", "application/json");
    headers = headers.set(
      "Authorization",
      "Basic " + localStorage.getItem("map_control")
    );

    return this.http.post(this.URL_BACKEND + "/api/signup", customer, {
      headers: headers,
    });
  }

  getDepartamento(): Observable<any> {
    // console.log(token)

    return this.http.get(this.URL_BACKEND + "/api/departamentos");
  }

  getProvincia(region): Observable<any> {
    // console.log(token)

    return this.http.get(
      this.URL_BACKEND + `/api/provincias?code_departamento=${region}`
    );
  }

  getDistrito(provincia): Observable<any> {
    // console.log(token)

    return this.http.get(
      this.URL_BACKEND + `/api/distritos?code_provincia=${provincia}`
    );
  }
}
