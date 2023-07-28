import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UserFormComponent } from './components/user-form/user-form.component';
import { UsersListComponent } from './components/users-list/users-list.component';
import {SharedModule} from "../../../shared/shared.module";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatTableModule} from "@angular/material/table";


@NgModule({
  declarations: [
    UserFormComponent,
    UsersListComponent
  ],
    imports: [
        CommonModule,
        UsersRoutingModule,
        SharedModule,
        MatPaginatorModule,
        MatTableModule
    ]
})
export class UsersModule { }
