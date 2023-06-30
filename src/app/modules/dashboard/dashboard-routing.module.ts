import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardLayoutComponent } from './components/dashboard-layout/dashboard-layout.component';
import {authGuard} from "../shared/guards/auth.guard";

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
        canActivate: [authGuard],
        loadChildren: () => import('./modules/pacientes/pacientes.module').then(module => module.PacientesModule)
      },
      {
        path: 'users',
        canActivate: [authGuard],
        loadChildren: () => import('./modules/users/users.module').then(module => module.UsersModule)
      }
      ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
