import { CommonModule } from "@angular/common";
import { IonicModule } from "@ionic/angular";
import { NgModule } from "@angular/core";
import { WelcomeMessageComponent } from "./welcome-message/welcome-message.component";

import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { EditperfilComponent } from "./editperfil/editperfil.component";
import { ModalInforComponent } from "./modal-infor/modal-infor.component";
import { NoticiaListComponent } from "./noticia-list/noticia-list.component";

@NgModule({
  declarations: [
    WelcomeMessageComponent,
    EditperfilComponent,
    ModalInforComponent,
    NoticiaListComponent,
  ],
  exports: [WelcomeMessageComponent, ModalInforComponent, NoticiaListComponent],
  imports: [CommonModule, IonicModule, ReactiveFormsModule, FormsModule],
  providers: [],
})
export class ComponentsModule {}
