import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
/* import { LoginCofidePageRoutingModule } from './login-cofide-preview-routing.module'; */

import { LoginComponent } from './login/login.component';
import { ComponentsModule } from '../components/components.module';
import { PasswordComponent } from './password/password.component';
import { RegisterComponent } from './register/register.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ValidationCodeComponent } from './validation-code/validation-code.component';
import { CodeInputModule } from 'angular-code-input';
import { TermConditionComponent } from './term-condition/term-condition.component';
import { ValidationTwoComponent } from './validation-two/validation-two.component';
import { SendPasswordComponent } from './send-password/send-password.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonicModule,
    FormsModule,
    CodeInputModule,
    ComponentsModule,
  ],
  declarations: [
    LoginComponent,
    PasswordComponent,
    RegisterComponent,
    ForgotPasswordComponent,
    TermConditionComponent,
    ValidationCodeComponent,
    ValidationTwoComponent,
    SendPasswordComponent,
  ],
})
export class LoginCofidePageModule {}
