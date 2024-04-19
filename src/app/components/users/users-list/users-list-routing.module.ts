import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UsersListComponent } from './users-list.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: UsersListComponent }
        // { path: 'list', loadChildren: () => import('./users.module').then(m => m.UsersModule) },
        // { path: '**', redirectTo: '/notfound' }
    ])],
    exports: [RouterModule]
})
export class UsersListRoutingModule { }
