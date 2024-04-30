import { Component } from '@angular/core';

import { MessageService } from 'primeng/api';

import { UsersService } from '../users.service';



interface Column {
    field: string;
    header: string;
}

interface userRole {
    label: string;
    value: string;
}

interface User {
    id?: number;
    nombre?: string;
    email?: string;
    role?: userRole;
    password?: string;
    is_active?: boolean;
    createdAt?: Date;
    UpdatedAt?: Date;
}

@Component({
    //   selector: 'app-users-list',
    //   standalone: true,
    //   imports: [],
    templateUrl: './users-list.component.html',
    //   styleUrl: './users-list.component.scss'
    providers: [MessageService]
})
export class UsersListComponent {

    users: User[] = [];
    user: User = {};
    selectedUsers: User[] = [];
    cols: Column[] = [];
    roles: userRole[] = [];

    userDialog: boolean = false;
    deleteUserDialog: boolean = false;
    deleteUsersDialog: boolean = false;

    submitted: boolean = false;

    // rowsPerPageOptions = [5, 10, 20];

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

        this.roles = [
            { label: 'Administrador', value: 'admin' },
            { label: 'Usuario', value: 'user' },
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

          }
        })


    }


    openNewUser() {
        this.user = {};
        this.submitted = false;
        this.userDialog = true;
    }

    editUser(user: User) {
        this.user = { ...user };
        this.userDialog = true;
    }

    hideDialog() {
        this.userDialog = false;
        this.submitted = false;
    }

    saveUser() {
        this.submitted = true;
        this.usersService.createUsuario(this.user)
        .subscribe({
          next: (resp: any) => { // TODO UserResponse
            console.log(resp);
            this.users.push(resp.data);
            this.users = [...this.users];
            this.messageService.add({ severity: 'success', summary: '¡Éxito!', detail: 'Usuario creado correctamente'});
          },
          error: e => {
            console.error("Error al crear usuario: ", e);
            this.messageService.add({ severity: 'error', summary: '¡Error!', detail: 'Error al crear usuario'});
          }
        });
        this.userDialog = false;
        this.user = {};
    }


    deleteUser(user: User) {
        this.deleteUserDialog = true;
        this.user = { ...user };
    }

    confirmDelete() {
        this.deleteUserDialog = false;
        this.usersService.deleteUsuarios([this.user.id])
        .subscribe({
          next: () => {
            this.users = this.users.filter(val => val.id !== this.user.id);
            this.messageService.add({ severity: 'success', summary: '¡Éxito!', detail: 'Usuario eliminado'});
          },
          error: e => {
            console.error("Error al eliminar usuario: ", e);
            this.messageService.add({ severity: 'error', summary: '¡Error!', detail: 'Error al eliminar usuario'});
          },
          complete: () => {this.user = {}}
        });
    }


    deleteSelecteUsers() {
        this.deleteUsersDialog = true;
    }

    confirmDeleteSelected() {
        this.deleteUsersDialog = false;
        const selectedUserIds = this.selectedUsers.map(user => user.id);
        this.usersService.deleteUsuarios(selectedUserIds)
        .subscribe({
          next: () => {
            this.users = this.users.filter(val => !this.selectedUsers.includes(val));
            this.messageService.add({ severity: 'success', summary: '¡Éxito!', detail: 'Usuarios eliminados'});
          },
          error: e => {
            console.error("Error al eliminar usuarios: ", e);
            this.messageService.add({ severity: 'error', summary: '¡Error!', detail: 'Error al eliminar usuarios'});
          },
          complete: () => {this.selectedUsers = []}
        });
    }




}
