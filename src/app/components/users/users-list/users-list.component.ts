import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { UsersService } from '../users.service';


// TODO - Export interfaces file
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

interface PageEvent {
    first: number;
    rows: number;
    page: number;
    pageCount: number;
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

    loading: boolean = true;

    pageSizeOptions: number[] = [1, 2, 5, 10, 20, 50];
    currentPage: number = 1;
    pageSize: number = 2;
    totalRecords: number = 0;
    first: number = 0;
    // last: number = 1;

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
        this.loadUsers();
    }

    loadUsers(){
        this.usersService.getUsuarios({ page: this.currentPage, pageSize: this.pageSize})
        .subscribe({
          next: resp => {
            console.log(resp);
            this.users = resp.data.rows;
            this.totalRecords = resp.data.count;
            this.loading = false;
          },
          error: e => {
            console.error("Error al listar usuarios: ", e);
            this.messageService.add({ severity: 'error', summary: '¡Error!', detail: 'Error al listar usuarios'});
          }
        })
    }

    // TODO - This only triggers on pagination
    onPageChange(event: any): void {
        this.first = event.first;
        this.pageSize = event.rows;
        this.currentPage = this.first / this.pageSize + 1;
        console.log("CurrentPage - ", this.currentPage, " | PageSize - ", this.pageSize);
        this.loadUsers();
    }

    // TODO - This triggers on pagination, ordering and filtering
    // loadNodes() {

    // }

    // TODO
    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
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
    }

    editUser() {
        this.usersService.updateUsuario(this.user)
        .subscribe({
          next: (resp: any) => { // TODO UserResponse
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


}
