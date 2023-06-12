import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardLayoutComponent } from './components/dashboard-layout/dashboard-layout.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardLayoutComponent,

    children: [
      {
        path: '',
        redirectTo: 'pacientes',
        pathMatch: 'full'
      },
      {
        path: 'pacientes',
        loadChildren: () => import('./modules/pacientes/pacientes.module').then(module => module.PacientesModule)
      }]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
