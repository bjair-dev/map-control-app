import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
/* import { LoginCofidePageRoutingModule } from './login-cofide-preview-routing.module'; */

import { LoginComponent } from './login/login.component';
import { ComponentsModule } from '../components/components.module';
import { PasswordComponent } from './password/password.component';
import { RegisterComponent } from './register/register.component';
@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonicModule,
    FormsModule,
    ComponentsModule,
  ],
  declarations: [LoginComponent, PasswordComponent, RegisterComponent],
})
export class LoginCofidePageModule {}
