import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PacientesRoutingModule } from './pacientes-routing.module';
import { ListaPacientesComponent } from './components/lista-pacientes/lista-pacientes.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { FormularioPacienteComponent } from './components/formulario-paciente/formulario-paciente.component';
import { HistoriaClinicaModule } from '../historia-clinica/historia-clinica.module';
import { SharedModule } from 'src/app/modules/shared/shared.module';


@NgModule({
  declarations: [
    ListaPacientesComponent,
    FormularioPacienteComponent
  ],
  imports: [
    CommonModule,

    PacientesRoutingModule,
    MatPaginatorModule,
    MatTableModule,
    HistoriaClinicaModule,
    SharedModule
  ]
})
export class PacientesModule { }
