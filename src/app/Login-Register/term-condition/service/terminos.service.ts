import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TerminosService {
  // API path
  URL_BACKEND = environment.BACKEND_URL;

  constructor(private http: HttpClient) {}

  // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    }),
  };

  //OBTENER TABLA

  obtenerTerminos(): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-type', 'application/json');
    headers = headers.set(
      'Authorization',
      'Bearer ' + localStorage.getItem('map_control')
    );
    return this.http.get<any>(this.URL_BACKEND + `/api/terms-conditions`, {
      headers: headers,
    });
  }

  aceptTerminos(): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-type', 'application/json');
    headers = headers.set(
      'Authorization',
      'Bearer ' + localStorage.getItem('map_control')
    );
    return this.http.put<any>(
      this.URL_BACKEND + `/api/user-account/terms/conditions`,
      {},
      {
        headers: headers,
      }
    );
  }
}
