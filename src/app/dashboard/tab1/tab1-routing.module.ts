import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { NoticiaListComponent } from "src/app/components/noticia-list/noticia-list.component";
import { Tab1Page } from "./tab1.page";

const routes: Routes = [
  {
    path: "",
    component: Tab1Page,
  },
  {
    path: "noticias",
    component: NoticiaListComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Tab1PageRoutingModule {}
