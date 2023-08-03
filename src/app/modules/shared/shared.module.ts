import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HistoriaClinicaService } from './services/historia-clinica.service';
import { ModalUsarPlantillaNotaComponent } from './components/modal-usar-plantilla-nota/modal-usar-plantilla-nota.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { PersonFormComponent } from './components/person-form/person-form.component';
import {HttpClientModule} from "@angular/common/http";
import {AuthService} from "./services/auth.service";
import {CookieService} from "ngx-cookie-service";
import {SweetAlert2Module} from "@sweetalert2/ngx-sweetalert2";
import {UsersService} from "./services/users.service";
import {TokenService} from "./services/token.service";
import {UtilsService} from "./services/utils.service";
import {KeyFilterModule} from "primeng/keyfilter";
import {AutoCompleteModule} from "primeng/autocomplete";

@NgModule({
  declarations: [
    ModalUsarPlantillaNotaComponent,
    PersonFormComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    SweetAlert2Module,
    KeyFilterModule,
    AutoCompleteModule,
    FormsModule
  ],
  exports: [
    ModalUsarPlantillaNotaComponent,
    PersonFormComponent,
  ],
  providers: [HistoriaClinicaService, AuthService, CookieService, UsersService, TokenService, UtilsService]
})
export class SharedModule { }
