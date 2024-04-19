import { Component } from '@angular/core';

import { MessageService } from 'primeng/api';

import { UsersService } from '../users.service';



@Component({
    //   selector: 'app-users-list',
    //   standalone: true,
    //   imports: [],
    templateUrl: './users-list.component.html',
    //   styleUrl: './users-list.component.scss'
    providers: [MessageService]
})
export class UsersListComponent {

    users: any; // TODO - User type
    cols: any[] = [];

    constructor(
        private usersService: UsersService,
        private messageService: MessageService
        // protected router: Router,

      ) { }


    ngOnInit(): void {

        this.cols = [
            { field: 'id', header: 'ID' },
            { field: 'nombre', header: 'Nombre' },
            { field: 'email', header: 'Email' },
            { field: 'role', header: 'Rol' }
        ];

        // TODO - Resolver
        this.usersService.getUsuarios()
        .subscribe({
          next: resp => {
            this.users = resp.data;
            this.messageService.add({ severity: 'success', summary: '¡Éxito!', detail: 'Usuarios cargados correctamente'});
            console.log(resp);
          },
          error: e => {
            console.error("Error al listar usuarios: ", e);
            // this.toastrService.show(e.error.details || e.error.message || 'Error al listar usuarios', 'Error', { status: "danger" });
          }
        })


      }

}
