import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ToastModule } from 'primeng/toast';
import { TableModule } from 'primeng/table';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { InputSwitchModule } from 'primeng/inputswitch';
import { RippleModule } from 'primeng/ripple';

import { UsersListComponent } from './users-list.component';
import { UsersListRoutingModule } from './users-list-routing.module';





@NgModule({
  declarations: [UsersListComponent],
  imports: [
    CommonModule,
    UsersListRoutingModule,
    FormsModule,
    // RippleModule,
    TableModule,
    ToastModule,
    ToolbarModule,
    ButtonModule,
    InputTextModule,
    DropdownModule,
    InputSwitchModule,
    DialogModule

  ]
})
export class UsersListModule { }
