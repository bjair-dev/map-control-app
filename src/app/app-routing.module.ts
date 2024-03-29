import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";
import { NoticiaListComponent } from "./components/noticia-list/noticia-list.component";
import { TabsPage } from "./dashboard/tabs/tabs.page";
import { ForgotPasswordComponent } from "./Login-Register/forgot-password/forgot-password.component";
import { LoginComponent } from "./Login-Register/login/login.component";
import { RegisterComponent } from "./Login-Register/register/register.component";
import { SendPasswordComponent } from "./Login-Register/send-password/send-password.component";
import { TermConditionComponent } from "./Login-Register/term-condition/term-condition.component";
import { ValidationCodeComponent } from "./Login-Register/validation-code/validation-code.component";
import { ValidationTwoComponent } from "./Login-Register/validation-two/validation-two.component";
import { PreloaderComponent } from "./preloader/preloader.component";
import { SplashComponent } from "./splash/splash.component";

const routes: Routes = [
  {
    path: "",
    component: PreloaderComponent,
  },

  {
    path: "splash",
    component: SplashComponent,
  },
  {
    path: "login",
    component: LoginComponent,
    loadChildren: () =>
      import("./Login-Register/login.module").then(
        (m) => m.LoginCofidePageModule
      ),
  },
  {
    path: "register",
    component: RegisterComponent,
    loadChildren: () =>
      import("./Login-Register/login.module").then(
        (m) => m.LoginCofidePageModule
      ),
  },
  {
    path: "validation",
    component: ValidationCodeComponent,
    loadChildren: () =>
      import("./Login-Register/login.module").then(
        (m) => m.LoginCofidePageModule
      ),
  },
  {
    path: "validation-code-pass",
    component: ValidationTwoComponent,
    loadChildren: () =>
      import("./Login-Register/login.module").then(
        (m) => m.LoginCofidePageModule
      ),
  },
  {
    path: "send-pass",
    component: SendPasswordComponent,
    loadChildren: () =>
      import("./Login-Register/login.module").then(
        (m) => m.LoginCofidePageModule
      ),
  },
  {
    path: "terms-conditions",
    component: TermConditionComponent,
    loadChildren: () =>
      import("./Login-Register/login.module").then(
        (m) => m.LoginCofidePageModule
      ),
  },
  {
    path: "send-mail",
    component: ForgotPasswordComponent,
    loadChildren: () =>
      import("./Login-Register/login.module").then(
        (m) => m.LoginCofidePageModule
      ),
  },

  {
    path: "dashboard",
    loadChildren: () =>
      import("./dashboard/tabs/tabs.module").then((m) => m.TabsPageModule),
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
