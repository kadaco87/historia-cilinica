import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HistoriaClinicaRoutingModule } from './historia-clinica-routing.module';
import { DatosPersonalesPacienteComponent } from './components/datos-personales-paciente/datos-personales-paciente.component';
import { HistoriaClinicaLayoutComponent } from './components/historia-clinica-layout/historia-clinica-layout.component';
import { SignosVitalesComponent } from './components/signos-vitales/signos-vitales.component';


@NgModule({
  declarations: [
    DatosPersonalesPacienteComponent,
    HistoriaClinicaLayoutComponent,
    SignosVitalesComponent
  ],
  imports: [
    CommonModule,
    HistoriaClinicaRoutingModule
  ]
})
export class HistoriaClinicaModule { }
