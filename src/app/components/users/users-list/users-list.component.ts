import { Component } from '@angular/core';

import { UsersService } from '../users.service';


@Component({
//   selector: 'app-users-list',
//   standalone: true,
//   imports: [],
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.scss'
})
export class UsersListComponent {

    users: any; // TODO - User type


    constructor(
        private usersService: UsersService,
        // protected router: Router,

      ) { }


    ngOnInit(): void {

        // TODO - Resolver
        this.usersService.getUsuarios()
        .subscribe({
          next: resp => {
            this.users = resp;
            console.log(resp);
          },
          error: e => {
            console.error("Error al listar usuarios: ", e);
            // this.toastrService.show(e.error.details || e.error.message || 'Error al listar usuarios', 'Error', { status: "danger" });
          }
        })


      }

}
