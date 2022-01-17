import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { PreloaderComponent } from './preloader/preloader.component';
import { SplashComponent } from './splash/splash.component';

const routes: Routes = [
  {
    path: '',
    component: PreloaderComponent,
  },

  {
    path: 'splash',
    component: SplashComponent,
  },
  /* {
    path: '',
    loadChildren: () =>
    
      import('./dashboard/tabs/tabs.module').then((m) => m.TabsPageModule), 
  },*/
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
