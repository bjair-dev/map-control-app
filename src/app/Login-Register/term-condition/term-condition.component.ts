import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  LoadingController,
  ModalController,
  Platform,
  ToastController,
} from '@ionic/angular';
import { Subscription } from 'rxjs';
import { TerminosService } from './service/terminos.service';

@Component({
  selector: 'app-term-condition',
  templateUrl: './term-condition.component.html',
  styleUrls: ['./term-condition.component.scss'],
})
export class TermConditionComponent implements OnInit {
  @Input() isModal;
  constructor(
    public router: Router,
    private _terms: TerminosService,
    private loadingController: LoadingController,
    private _sModal: ModalController,
    private platform: Platform,
    private _sToast: ToastController
  ) {}
  dataTerms;

  async presentLoading(message: string = 'Ingresando al sistema.....') {
    const loading = await this.loadingController.create({
      cssClass: '',
      message,
    });
    await loading.present();
    return loading;
  }
  ngOnInit() {
    this._terms.obtenerTerminos().subscribe((terminos: any) => {
      this.dataTerms = terminos;
    });
  }
  async presentToast(m) {
    const toast = await this._sToast.create({
      message: m,
      duration: 3000,
    });
    toast.present();
  }
  subscription = new Subscription();
  ionViewDidEnter() {
    if (this.isModal) {
    } else {
      this.subscription = this.platform.backButton.subscribeWithPriority(
        9999,
        () => {
          // do nothing
          this.presentToast('Debe aceptar los términos y condiciones.');
        }
      );
    }
  }

  ionViewWillLeave() {
    if (this.isModal) {
    } else {
      this.subscription.unsubscribe();
    }
  }
  volverLogin() {
    this.router.navigate(['/login']);
  }
  async entraDashboard() {
    const loading = await this.presentLoading();
    this._terms.aceptTerminos().subscribe(
      async (resp) => {
        loading.dismiss();
      },
      (error) => {
        loading.dismiss();
        this.presentToast('Ocurrió un error, inténtelo nuevamente.');
      }
    );
    this.router.navigate(['/dashboard']);
  }

  cerrarModal() {
    this._sModal.dismiss();
  }
}
