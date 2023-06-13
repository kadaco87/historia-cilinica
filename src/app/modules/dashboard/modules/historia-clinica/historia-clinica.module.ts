import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HistoriaClinicaRoutingModule } from './historia-clinica-routing.module';
import { DatosPersonalesPacienteComponent } from './components/datos-personales-paciente/datos-personales-paciente.component';
import { HistoriaClinicaLayoutComponent } from './components/historia-clinica-layout/historia-clinica-layout.component';
import { SignosVitalesComponent } from './components/signos-vitales/signos-vitales.component';
import { EditorNotasComponent } from './components/editor-notas/editor-notas.component';
import { EditorModule } from 'primeng/editor';
import { ReactiveFormsModule } from '@angular/forms';
import { AntecedentesClinicosComponent } from './components/antecedentes-clinicos/antecedentes-clinicos.component';
import { AtencionMedicaComponent } from './components/atencion-medica/atencion-medica.component';

@NgModule({
  declarations: [
    DatosPersonalesPacienteComponent,
    HistoriaClinicaLayoutComponent,
    SignosVitalesComponent,
    EditorNotasComponent,
    AntecedentesClinicosComponent,
    AtencionMedicaComponent
  ],
  imports: [
    CommonModule,
    HistoriaClinicaRoutingModule,
    EditorModule,
    ReactiveFormsModule
  ]
})
export class HistoriaClinicaModule { }
