import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PacientesService } from './services/pacientes.service';
import { ModalUsarPlantillaNotaComponent } from './components/modal-usar-plantilla-nota/modal-usar-plantilla-nota.component';
import {ReactiveFormsModule} from "@angular/forms";
import { PersonFormComponent } from './components/person-form/person-form.component';
import {HttpClientModule} from "@angular/common/http";
import {AuthService} from "./services/auth.service";
import {CookieService} from "ngx-cookie-service";
import {SweetAlert2Module} from "@sweetalert2/ngx-sweetalert2";

@NgModule({
  declarations: [
    ModalUsarPlantillaNotaComponent,
    PersonFormComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    SweetAlert2Module
  ],
  exports: [
    ModalUsarPlantillaNotaComponent,
    PersonFormComponent,
  ],
  providers: [PacientesService, AuthService, CookieService]
})
export class SharedModule { }
