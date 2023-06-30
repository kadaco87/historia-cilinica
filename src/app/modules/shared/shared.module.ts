import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PacientesService } from './services/pacientes.service';
import { ModalUsarPlantillaNotaComponent } from './components/modal-usar-plantilla-nota/modal-usar-plantilla-nota.component';
import { ModalCrearPlantillaNotaComponent } from './components/modal-crear-plantilla-nota/modal-crear-plantilla-nota.component';
import {ReactiveFormsModule} from "@angular/forms";
import { PersonFormComponent } from './components/person-form/person-form.component';
import {HttpClientModule} from "@angular/common/http";
import {AuthService} from "./services/auth.service";



@NgModule({
  declarations: [
    ModalUsarPlantillaNotaComponent,
    ModalCrearPlantillaNotaComponent,
    PersonFormComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  exports: [
    ModalUsarPlantillaNotaComponent,
    PersonFormComponent
  ],
  providers: [PacientesService, AuthService]
})
export class SharedModule { }
