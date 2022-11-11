import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { RouteReuseStrategy } from "@angular/router";
import { HttpClientModule } from "@angular/common/http";
import { IonicStorageModule } from "@ionic/storage-angular";
import { IonicModule, IonicRouteStrategy } from "@ionic/angular";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { ComponentsModule } from "./components/components.module";
/* import { AgmCoreModule } from '@agm/core'; */
import { OneSignal } from "@ionic-native/onesignal/ngx";
import { Facebook } from "@ionic-native/facebook/ngx";
import { SplashComponent } from "./splash/splash.component";

@NgModule({
  declarations: [AppComponent, SplashComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    ComponentsModule,
    HttpClientModule,

    IonicModule.forRoot(),
    AppRoutingModule,
  ],
  providers: [{ provide: OneSignal }, Facebook],
  bootstrap: [AppComponent],
})
export class AppModule {}
