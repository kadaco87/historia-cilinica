import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormularioPacienteComponent } from './components/formulario-paciente/formulario-paciente.component';
import { ListaPacientesComponent } from './components/lista-pacientes/lista-pacientes.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        redirectTo: 'lista-pacientes',
        pathMatch: 'full'
      },
      {
        path: 'lista-pacientes',
        component: ListaPacientesComponent
      },
      {
        path: 'forumlario-paciente', //manera de decir al id que es una variable con los dos puntos
        component: FormularioPacienteComponent
      },
      {
        path: 'forumlario-paciente/:id', //una con parametros, carga el mismo formulario
        component: FormularioPacienteComponent
      }
    ]

  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PacientesRoutingModule { }
