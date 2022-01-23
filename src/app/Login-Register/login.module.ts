import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
/* import { LoginCofidePageRoutingModule } from './login-cofide-preview-routing.module'; */

import { LoginComponent } from './login/login.component';
import { ComponentsModule } from '../components/components.module';
import { PasswordComponent } from './password/password.component';
@NgModule({
  imports: [CommonModule, ReactiveFormsModule, IonicModule, ComponentsModule],
  declarations: [LoginComponent, PasswordComponent],
})
export class LoginCofidePageModule {}
