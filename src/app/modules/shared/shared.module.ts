import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PacientesService } from './services/pacientes.service';
import { ModalUsarPlantillaNotaComponent } from './components/modal-usar-plantilla-nota/modal-usar-plantilla-nota.component';
import { ModalCrearPlantillaNotaComponent } from './components/modal-crear-plantilla-nota/modal-crear-plantilla-nota.component';
import {ReactiveFormsModule} from "@angular/forms";



@NgModule({
  declarations: [
    ModalUsarPlantillaNotaComponent,
    ModalCrearPlantillaNotaComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [
    ModalUsarPlantillaNotaComponent
  ],
  providers: [PacientesService]
})
export class SharedModule { }
