import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
  HttpParams,
} from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  URL_BACKEND = environment.BACKEND_URL;
  userRedesSociales = null;
  constructor(private http: HttpClient) {}
  // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    }),
  };
  //OBTENER Rubros

  loginNormal(email, password): Observable<any> {
    // console.log(token)

    return this.http.post(this.URL_BACKEND + '/api/signin', {
      email,
      password,
    });
  }

  loginSocialNetwork(obj) {
    return this.http.post(
      this.URL_BACKEND + '/api/singup-social-network-user',
      obj
    );
  }

  verificarEmailUser(obj) {
    return this.http.post(this.URL_BACKEND + '/api/validate-user', obj);
  }
}
