import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PacientesService } from './services/pacientes.service';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [PacientesService]
})
export class SharedModule { }
