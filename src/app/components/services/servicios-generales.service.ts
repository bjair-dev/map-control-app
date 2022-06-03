import { EventEmitter, Injectable, Output } from "@angular/core";
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { retry, catchError } from "rxjs/operators";
import { environment } from "../../../environments/environment";
import { Router } from "@angular/router";
import {
  LoadingController,
  MenuController,
  ModalController,
  NavController,
} from "@ionic/angular";
/* import { NotificationDetailsPage } from 'src/app/notification-details/notification-details.page';
import { OnboardComponent } from '../../components/onboard/onboard.component';
import { ComponentsService } from './components.service'; */
@Injectable({
  providedIn: "root",
})
export class ServiciosGenerales {
  @Output() changeTab = new EventEmitter<any>();
  // API path
  URL_BACKEND = environment.BACKEND_URL;

  user;
  noti;
  desafioEntry = false;
  medals = 0;
  constructor(
    private http: HttpClient,
    private router: Router,
    private modalController: ModalController,
    private menu: MenuController,
    private loadingController: LoadingController,
    /*     private _sComponents: ComponentsService,
     */ private _sNav: NavController
  ) {}

  // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    }),
  };
  validarUser(customer): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.set("Content-type", "application/json");
    headers = headers.set(
      "Authorization",
      "Basic " + localStorage.getItem("map_control")
    );

    return this.http.post(
      this.URL_BACKEND + "/api/active/verifycode",
      customer,
      {
        headers: headers,
      }
    );
  }

  enviarCodigo(customer): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.set("Content-type", "application/json");
    headers = headers.set(
      "Authorization",
      "Basic " + localStorage.getItem("map_control")
    );

    return this.http.post(
      this.URL_BACKEND + "/api/sendcodeverification",
      customer,
      {
        headers: headers,
      }
    );
  }

  changePass(customer): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.set("Content-type", "application/json");
    headers = headers.set(
      "Authorization",
      "Basic " + localStorage.getItem("map_control")
    );

    return this.http.post(this.URL_BACKEND + "/api/restore", customer, {
      headers: headers,
    });
  }

  async presentLoading(message: string = "Cerrando sesión.....") {
    const loading = await this.loadingController.create({
      cssClass: "",
      message,
    });
    await loading.present();
    return loading;
  }

  unauthorized() {
    this.menu.close();
    localStorage.removeItem("map_control");
    localStorage.clear();
    // this.router.navigateByUrl('/login');
    this.router.navigate(["/login"]);
  }
  @Output() actualizarPerfil = new EventEmitter<any>();

  getNoticias(): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.set("Content-type", "application/json");
    headers = headers.set(
      "Authorization",
      "Bearer " + localStorage.getItem("map_control")
    );

    return this.http.get<any>(this.URL_BACKEND + `/api/user-account/noticias`, {
      headers: headers,
    });
  }

  getProfile() {
    this.user = null;
    let headers = new HttpHeaders();
    headers = headers.set("Content-type", "application/json");
    headers = headers.set(
      "Authorization",
      "Bearer " + localStorage.getItem("map_control")
    );
    /*     this.getUserMedals();
     */ //profile user
    this.http
      .get(this.URL_BACKEND + "/api/user-account", {
        headers: headers,
      })
      .subscribe((resp) => {
        this.user = resp;

        let seguir = true;
        if (this.user.terms_and_conditions == false) {
          this.router.navigateByUrl("/terms-conditions");
          seguir = false;
        }
        if (seguir) {
          let ob = +localStorage.getItem("onboard");
          if (this.user.number_of_sessions == 1 && ob) {
            localStorage.setItem("onboard", "1");
            this.launchOnBoard();
          }
        }
      });
  }
  async launchOnBoard() {
    /*     const modal = await this.modalController.create({
      component: OnboardComponent,
      cssClass: 'modal-onboard',
      backdropDismiss: true,
        componentProps: {
        content: this.content,
      }, 
    });
    // modal.onDidDismiss().then(async (data) => {});
    return await modal.present(); */
  }
  getNotification() {
    this.noti = null;
    let headers = new HttpHeaders();
    headers = headers.set("Content-type", "application/json");
    headers = headers.set(
      "Authorization",
      "Bearer " + localStorage.getItem("map_control")
    );

    this.http
      .get(this.URL_BACKEND + "/api/notification-pending", {
        headers: headers,
      })
      .subscribe((respx: any) => {
        this.noti = respx;
        if (respx.length > 0) {
          let notificaciones = [];
          notificaciones = respx;
          // console.log('son tus notificaciones', this.noti);
          if (notificaciones.length > 0) {
            /*             this._sComponents.openModal = true;
             */
          }
          notificaciones.forEach((element) => {
            // console.log(element, 'data');
            this.abrirModal(element);
          });
        }
      });
  }

  async abrirModal(event) {
    /*   const modal = await this.modalController.create({
      component: NotificationDetailsPage,
      cssClass: '',
      backdropDismiss: true,
      componentProps: {
        content: event,
      },
    });
    modal.onDidDismiss().then(async (data) => {
      // console.log('cerro noti');
      // console.log(event.userNotificationId);
      this.updateEstadonoti(event.userNotificationId).subscribe((resp) => {
        console.log(resp);
      });
    });
    return await modal.present(); */
  }

  /*   getUserMedals() {
    let headers = new HttpHeaders();
    headers = headers.set('Content-type', 'application/json');
    headers = headers.set(
      'Authorization',
      'Bearer ' + localStorage.getItem('map_control')
    );
    //medals user
    this.http
      .get(this.URL_BACKEND + '/api/user-challenge/medals', {
        headers: headers,
      })
      .subscribe((resp: any) => {
        this.medals = resp;
      });
  } */

  getFraseInicial(): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.set("Content-type", "application/json");
    headers = headers.set(
      "Authorization",
      "Bearer " + localStorage.getItem("map_control")
    );

    return this.http.get(this.URL_BACKEND + "/api/motivational-phrase", {
      headers: headers,
    });
  }

  async signout() {
    const loading = await this.presentLoading();

    let headers = new HttpHeaders();
    headers = headers.set("Content-type", "application/json");
    headers = headers.set(
      "Authorization",
      "Bearer " + localStorage.getItem("map_control")
    );
    this.http
      .get(this.URL_BACKEND + "/api/signout", {
        headers: headers,
      })
      .subscribe(
        (resp) => {
          this.menu.close();
          localStorage.removeItem("map_control");
          localStorage.clear();
          loading.dismiss();

          // this.router.navigateByUrl('/login');
          this._sNav.navigateRoot("/login");
          // this.router.navigate(['/login']);
        },
        (error) => {
          this.menu.close();
          localStorage.removeItem("map_control");
          localStorage.clear();
          loading.dismiss();
          // this.router.navigateByUrl('/login');
          this._sNav.navigateRoot("/login");
          // this.router.navigate(['/login']);
        }
      );
  }

  getObtenerLoantype() {
    let headers = new HttpHeaders();
    headers = headers.set("Content-type", "application/json");
    headers = headers.set(
      "Authorization",
      "Bearer " + localStorage.getItem("map_control")
    );
    return this.http.get<any>(this.URL_BACKEND + `/api/loan-type-user`, {
      headers: headers,
    });
  }

  getObtenerFinanciera(id) {
    let headers = new HttpHeaders();
    headers = headers.set("Content-type", "application/json");
    headers = headers.set(
      "Authorization",
      "Bearer " + localStorage.getItem("map_control")
    );
    return this.http.get<any>(this.URL_BACKEND + `/api/loan-bank/` + `${id}`, {
      headers: headers,
    });
  }

  getRoute(categoria): string {
    if (categoria === 1) {
      return "tips";
    } else {
      if (categoria === 2) {
        return "videos";
      }
    }
  }

  getTipoHistory() {
    let headers = new HttpHeaders();
    headers = headers.set("Content-type", "application/json");
    headers = headers.set(
      "Authorization",
      "Bearer " + localStorage.getItem("map_control")
    );

    return this.http.get<any>(
      this.URL_BACKEND + `/api/user-content/history/videos`,
      {
        headers: headers,
      }
    );
  }

  getCategoríaTips() {
    console.log("llegan lasc ategorias");
    let headers = new HttpHeaders();
    headers = headers.set("Content-type", "application/json");
    headers = headers.set(
      "Authorization",
      "Bearer " + localStorage.getItem("map_control")
    );
    return this.http.get<any>(this.URL_BACKEND + `/api/tips-categories-user`, {
      headers: headers,
    });
  }
  getHistoryTips(id) {
    let headers = new HttpHeaders();
    headers = headers.set("Content-type", "application/json");
    headers = headers.set(
      "Authorization",
      "Bearer " + localStorage.getItem("map_control")
    );
    return this.http.get<any>(
      this.URL_BACKEND + `/api/user-content/history/tips/` + id,
      {
        headers: headers,
      }
    );
  }

  /*  getOldHistoryTips() {
    let headers = new HttpHeaders();
    headers = headers.set('Content-type', 'application/json');
    headers = headers.set(
      'Authorization',
      'Bearer ' + localStorage.getItem('map_control')
    );
    return this.http.get<any>(
      this.URL_BACKEND + `/api/user-content/history/tips`,
      {
        headers: headers,
      }
    );
  }

  getOldHistoryVideos() {
    let headers = new HttpHeaders();
    headers = headers.set('Content-type', 'application/json');
    headers = headers.set(
      'Authorization',
      'Bearer ' + localStorage.getItem('map_control')
    );
    return this.http.get<any>(
      this.URL_BACKEND + `/api/user-content/history/videos`,
      {
        headers: headers,
      }
    );
  } */

  enviarCodigos(id): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.set("Content-type", "application/json");
    headers = headers.set(
      "Authorization",
      "Bearer " + localStorage.getItem("map_control")
    );

    return this.http.put<any>(
      this.URL_BACKEND + `/api/updateIdDeviceUser/${id}`,
      {},
      {
        headers: headers,
      }
    );
  }

  updateDaySession(): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.set("Content-type", "application/json");
    headers = headers.set(
      "Authorization",
      "Bearer " + localStorage.getItem("map_control")
    );

    return this.http.put<any>(
      this.URL_BACKEND + `/api/user-account/daysession`,
      {},
      {
        headers: headers,
      }
    );
  }

  dataAnsweer(dataSurvey): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.set("Content-type", "application/json");
    headers = headers.set(
      "Authorization",
      "Bearer " + localStorage.getItem("map_control")
    );
    return this.http.post<any>(
      this.URL_BACKEND + `/api/answer-survey/`,
      dataSurvey,
      { headers: headers }
    );
  }
  updateEstadonoti(id): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.set("Content-type", "application/json");
    headers = headers.set(
      "Authorization",
      "Bearer " + localStorage.getItem("map_control")
    );
    return this.http.put<any>(
      this.URL_BACKEND + `/api/notification-pending/status/` + id,
      {},
      { headers: headers }
    );
  }

  updatePassword(pass): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.set("Content-type", "application/json");
    headers = headers.set(
      "Authorization",
      "Bearer " + localStorage.getItem("map_control")
    );
    return this.http.put<any>(
      this.URL_BACKEND + `/api/user-account/updatepassword`,
      {
        new_password: pass,
      },
      {
        headers: headers,
      }
    );
  }

  registrarIncidencia(actionId, contentId) {
    let headers = new HttpHeaders();
    headers = headers.set("Content-type", "application/json");
    headers = headers.set(
      "Authorization",
      "Bearer " + localStorage.getItem("map_control")
    );
    this.http
      .post<any>(
        this.URL_BACKEND + `/api/user-metrics`,
        {
          contentId: contentId,
          actionId: actionId,
        },
        {
          headers: headers,
        }
      )
      .subscribe();
  }

  //calcular tiempo de incidencia
  incidencia2 = {
    id: null,
    tiempo: null,
  };
  registrarIncidenciaRes(actionId, contentId) {
    let headers = new HttpHeaders();
    headers = headers.set("Content-type", "application/json");
    headers = headers.set(
      "Authorization",
      "Bearer " + localStorage.getItem("map_control")
    );
    this.http
      .post<any>(
        this.URL_BACKEND + `/api/user-metrics`,
        {
          contentId: contentId,
          actionId: actionId,
        },
        {
          headers: headers,
        }
      )
      .subscribe((resp) => {
        // this.incidencia = resp;
        this.incidencia2.id = resp.id;
        this.incidencia2.tiempo = new Date().getTime();
      });
  }

  actualizarIndicenciaRes() {
    let headers = new HttpHeaders();
    headers = headers.set("Content-type", "application/json");
    headers = headers.set(
      "Authorization",
      "Bearer " + localStorage.getItem("map_control")
    );

    let tim = new Date().getTime();
    let timeseg = Math.floor((tim - this.incidencia2.tiempo) / 1000);

    this.http
      .put<any>(
        this.URL_BACKEND + `/api/user-metrics`,
        {
          id: this.incidencia2.id,
          time: timeseg,
        },
        {
          headers: headers,
        }
      )
      .subscribe();
  }

  /**
   * Actualiza el perfil de usuario
   * @param user type { "sexo":"mujer", "date_of_birth":"1997-05-07"}
   * @returns Observable
   */
  updatePerfilUser(user): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.set("Content-type", "application/json");
    headers = headers.set(
      "Authorization",
      "Bearer " + localStorage.getItem("map_control")
    );
    return this.http.put<any>(
      this.URL_BACKEND + `/api/user-account/gender/dateofbirth`,
      user,
      {
        headers: headers,
      }
    );
  }

  updatePerfilImage(DataImg) {
    let headers = new HttpHeaders();
    headers = headers.set("Content-type", "application/json");
    headers = headers.set(
      "Authorization",
      "Bearer " + localStorage.getItem("map_control")
    );
    return this.http.put(
      this.URL_BACKEND + `/api/user-account/image`,
      DataImg,
      { headers: headers }
    );
  }
}
