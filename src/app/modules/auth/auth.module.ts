import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './components/login/login.component';
import { AuthLayoutComponent } from './components/auth-layout/auth-layout.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RecoveryPasswordComponent } from './components/recovery-password/recovery-password.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { RegisterComponent } from './components/register/register.component';


@NgModule({
  declarations: [
    LoginComponent,
    AuthLayoutComponent,
    RecoveryPasswordComponent,
    ChangePasswordComponent,
    RegisterComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule

  ]
})
export class AuthModule { }
