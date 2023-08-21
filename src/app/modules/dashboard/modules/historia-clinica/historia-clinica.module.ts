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
import { DispositivosMedicosComponent } from './components/dispositivos-medicos/dispositivos-medicos.component';
import { NotaEnfermeriaComponent } from './components/nota-enfermeria/nota-enfermeria.component';
import { MedicamentosComponent } from './components/medicamentos/medicamentos.component';
import { OrdenesMedicasComponent } from './components/ordenes-medicas/ordenes-medicas.component';
import {SharedModule} from "../../../shared/shared.module";
import {MatTableModule} from "@angular/material/table";
import {MatPaginatorModule} from "@angular/material/paginator";
import {KeyFilterModule} from "primeng/keyfilter";
import {MultiSelectModule} from "primeng/multiselect";


@NgModule({
  declarations: [
    DatosPersonalesPacienteComponent,
    HistoriaClinicaLayoutComponent,
    SignosVitalesComponent,
    AntecedentesClinicosComponent,
    AtencionMedicaComponent,
    DispositivosMedicosComponent,
    NotaEnfermeriaComponent,
    MedicamentosComponent,
    OrdenesMedicasComponent,
      ],
  imports: [
    CommonModule,
    HistoriaClinicaRoutingModule,
    ReactiveFormsModule,
    MatTreeModule,
    MatInputModule,
    MatCheckboxModule,
    MatIconModule,
    MatButtonModule,
    SharedModule,
    MatTableModule,
    MatPaginatorModule,
    KeyFilterModule,
    MultiSelectModule
  ]
})
export class HistoriaClinicaModule { }
