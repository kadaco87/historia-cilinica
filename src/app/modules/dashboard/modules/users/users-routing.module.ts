import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {UsersListComponent} from "./components/users-list/users-list.component";
import {UserFormComponent} from "./components/user-form/user-form.component";


const routes: Routes = [
  {
    path: '',


    children: [
      {
        path: '',
        redirectTo: 'users-list',
        pathMatch: 'full'
      },
      {
        path: 'users-list',
        component: UsersListComponent
      },
      {
        path: 'user-form/:action',
        component: UserFormComponent
      },
      {
        path: 'user-form/:action/:id',
        component: UserFormComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
