import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ToastModule } from 'primeng/toast';
import { TableModule } from 'primeng/table';

import { UsersListComponent } from './users-list.component';
import { UsersListRoutingModule } from './users-list-routing.module';



@NgModule({
  declarations: [UsersListComponent],
  imports: [
    CommonModule,
    UsersListRoutingModule,
    TableModule,
    ToastModule,

  ]
})
export class UsersListModule { }
