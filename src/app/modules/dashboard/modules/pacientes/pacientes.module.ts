import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PacientesRoutingModule } from './pacientes-routing.module';
import { ListaPacientesComponent } from './components/lista-pacientes/lista-pacientes.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { FormularioPacienteComponent } from './components/formulario-paciente/formulario-paciente.component';


@NgModule({
  declarations: [
    ListaPacientesComponent,
    FormularioPacienteComponent
  ],
  imports: [
    CommonModule,

    PacientesRoutingModule,
    MatPaginatorModule,
    MatTableModule
  ]
})
export class PacientesModule { }
