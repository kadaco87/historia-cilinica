import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HistoriaClinicaLayoutComponent } from './components/historia-clinica-layout/historia-clinica-layout.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        redirectTo: 'resumen',
        pathMatch: 'full'
      },
      {
        path: 'resumen',
        component: HistoriaClinicaLayoutComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HistoriaClinicaRoutingModule { }
