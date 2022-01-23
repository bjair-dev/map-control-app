import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { TabsPage } from './dashboard/tabs/tabs.page';
import { LoginComponent } from './Login-Register/login/login.component';
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

  {
    path: 'login',
    component: LoginComponent,
    loadChildren: () =>
      import('./Login-Register/login.module').then(
        (m) => m.LoginCofidePageModule
      ),
  },

  {
    path: 'dashboard',
    loadChildren: () =>
      import('./dashboard/tabs/tabs.module').then((m) => m.TabsPageModule),
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
