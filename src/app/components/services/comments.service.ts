import { Injectable } from "@angular/core";
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
  HttpUrlEncodingCodec,
} from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { retry, catchError } from "rxjs/operators";
import { environment } from "../../../environments/environment";

@Injectable({
  providedIn: "root",
})
export class CommentService {
  URL_BACKEND = environment.BACKEND_URL;

  constructor(private http: HttpClient) {}
  codec = new HttpUrlEncodingCodec();
  ngEncode(param: string) {
    return this.codec.encodeValue(param);
  }

  getComments(latitud): Observable<any> {
    console.log(latitud);
    let headers = new HttpHeaders();
    headers = headers.set("Content-type", "application/json");
    headers = headers.set(
      "Authorization",
      "Bearer " + localStorage.getItem("map_control")
    );

    return this.http.post<any>(
      this.URL_BACKEND + `/api/comments/getAll`,
      { direct_map: latitud },
      {
        headers: headers,
      }
    );
  }

  getColoresMapa(): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.set("Content-type", "application/json");
    headers = headers.set(
      "Authorization",
      "Bearer " + localStorage.getItem("map_control")
    );

    return this.http.get<any>(this.URL_BACKEND + `/api/comments`, {
      headers: headers,
    });
  }

  postComentario(user): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.set("Content-type", "application/json");
    headers = headers.set(
      "Authorization",
      "Bearer " + localStorage.getItem("map_control")
    );
    return this.http.post<any>(this.URL_BACKEND + `/api/comments`, user, {
      headers: headers,
    });
  }
}
