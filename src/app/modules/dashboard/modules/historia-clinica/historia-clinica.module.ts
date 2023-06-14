import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HistoriaClinicaRoutingModule } from './historia-clinica-routing.module';
import { DatosPersonalesPacienteComponent } from './components/datos-personales-paciente/datos-personales-paciente.component';
import { HistoriaClinicaLayoutComponent } from './components/historia-clinica-layout/historia-clinica-layout.component';
import { SignosVitalesComponent } from './components/signos-vitales/signos-vitales.component';

import { ReactiveFormsModule } from '@angular/forms';
import { AntecedentesClinicosComponent } from './components/antecedentes-clinicos/antecedentes-clinicos.component';
import { AtencionMedicaComponent } from './components/atencion-medica/atencion-medica.component';
import {MatTreeModule} from "@angular/material/tree";
import {MatInputModule} from "@angular/material/input";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";


@NgModule({
  declarations: [
    DatosPersonalesPacienteComponent,
    HistoriaClinicaLayoutComponent,
    SignosVitalesComponent,
    AntecedentesClinicosComponent,
    AtencionMedicaComponent,
      ],
  imports: [
    CommonModule,
    HistoriaClinicaRoutingModule,
    ReactiveFormsModule,
    MatTreeModule,
    MatInputModule,
    MatCheckboxModule,
    MatIconModule,
    MatButtonModule
  ]
})
export class HistoriaClinicaModule { }
