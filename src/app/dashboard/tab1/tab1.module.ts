import { IonicModule } from "@ionic/angular";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { Tab1Page } from "./tab1.page";
import { ExploreContainerComponentModule } from "../explore-container/explore-container.module";

import { Tab1PageRoutingModule } from "./tab1-routing.module";
import { AgmCoreModule } from "@agm/core";

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    Tab1PageRoutingModule,

    AgmCoreModule.forRoot({
      // please get your own API key here:
      // https://developers.google.com/maps/documentation/javascript/get-api-key?hl=en
      apiKey: "AIzaSyCaG3aW5sIzeCJ70EK8Qxc6tCin4mD9BxQ",
    }),
  ],
  declarations: [Tab1Page],
})
export class Tab1PageModule {}
