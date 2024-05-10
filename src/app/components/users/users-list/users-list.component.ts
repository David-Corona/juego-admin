import { Component } from '@angular/core';
import { LazyLoadEvent, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { UsersService } from '../shared/users.service';
import { User, UserRole, UserResponse } from '../shared/users.model';
import { QueryOptions, TableColumn } from '../../../shared/models/shared.model';



@Component({
    templateUrl: './users-list.component.html',
    providers: [MessageService]
})
export class UsersListComponent {

    users: User[] = [];
    user: User = {};
    selectedUsers: User[] = [];
    cols: TableColumn[] = [];
    roles: UserRole[] = [];

    submitted: boolean = false;
    userDialog: boolean = false;
    deleteUserDialog: boolean = false;
    deleteUsersDialog: boolean = false;

    loading: boolean;

    pageSizeOptions: number[] = [5, 10, 25, 50];
    pageSize: number = 5;
    totalRecords: number = 0;
    first: number = 0;


    constructor(
        private usersService: UsersService,
        private messageService: MessageService,
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

        this.loading = true
    }

    loadUsers(options: QueryOptions){
        this.usersService.getUsuarios(options)
        .subscribe({
          next: resp => {
            console.log(resp);
            this.users = resp.data.rows;
            this.totalRecords = resp.data.count;
          },
          error: e => {
            console.error("Error al listar usuarios: ", e);
            this.messageService.add({ severity: 'error', summary: '¡Error!', detail: 'Error al listar usuarios'});
          },
          complete: () => this.loading = false
        })
    }

    // Triggers on loading, pagination, ordering and filtering
    onChange(event: LazyLoadEvent): void {
        console.log("Event - ", event);
        this.first = event.first;

        const options: QueryOptions = {
            pageSize: event.rows,
            page: this.first / this.pageSize + 1,
            sortOrder: event.sortOrder,
            sortField: event.sortField,
            filters: JSON.stringify(event.filters)
        }

        this.pageSize = event.rows;

        this.loadUsers(options);
    }

    openNewUser() {
        this.user = {};
        this.submitted = false;
        this.userDialog = true;
    }

    openEditUser(user: User) {
        this.user = { ...user };
        this.userDialog = true;
    }

    hideDialog() {
        this.userDialog = false;
        this.submitted = false;
    }

    saveUser() {
        this.submitted = true;
        if(this.user.id){
            this.editUser();
        } else {
            this.createUser();
        }
        this.userDialog = false;
    }

    createUser() {
        this.usersService.createUsuario(this.user)
        .subscribe({
          next: (resp: UserResponse) => {
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
    }

    editUser() {
        this.usersService.updateUsuario(this.user)
        .subscribe({
          next: (resp: UserResponse) => {
            console.log(resp);
            this.users = this.users.map(u => u.id === this.user.id ? resp.data : u);
            this.messageService.add({ severity: 'success', summary: '¡Éxito!', detail: 'Usuario editado correctamente'});
          },
          error: e => {
            console.error("Error al editar usuario: ", e);
            this.messageService.add({ severity: 'error', summary: '¡Error!', detail: 'Error al editar usuario'});
          }
        });
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

    clear(table: Table) {
        table.clear();
    }

}
