import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';
import { LoadingController, MenuController } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class ComponentsService {
  openModal = false;
  // API path
  URL_BACKEND = environment.BACKEND_URL;

  constructor(private http: HttpClient) {}
  getResume(): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-type', 'application/json');
    headers = headers.set(
      'Authorization',
      'Bearer ' + localStorage.getItem('map_control')
    );
    return this.http.get(this.URL_BACKEND + '/api/entry/sumary/day', {
      headers: headers,
    });
  }

  //challenge works
  getOneQuestion(id): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-type', 'application/json');
    headers = headers.set(
      'Authorization',
      'Bearer ' + localStorage.getItem('map_control')
    );
    return this.http.get(this.URL_BACKEND + '/api/user-question/' + id, {
      headers: headers,
    });
  }

  getOneSurvey(id): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-type', 'application/json');
    headers = headers.set(
      'Authorization',
      'Bearer ' + localStorage.getItem('map_control')
    );
    return this.http.get(this.URL_BACKEND + '/api/user-survey/' + id, {
      headers: headers,
    });
  }

  createSurveyResponse(resp): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-type', 'application/json');
    headers = headers.set(
      'Authorization',
      'Bearer ' + localStorage.getItem('map_control')
    );
    return this.http.post(this.URL_BACKEND + '/api/answer-survey', resp, {
      headers: headers,
    });
  }
}
