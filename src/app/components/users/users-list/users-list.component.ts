import { Component } from '@angular/core';
import { LazyLoadEvent, MessageService, PrimeNGConfig } from 'primeng/api';
import { Table } from 'primeng/table';
import { UsersService } from '../users.service';


// TODO - Export to an interfaces file
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

    submitted: boolean = false;
    userDialog: boolean = false;
    deleteUserDialog: boolean = false;
    deleteUsersDialog: boolean = false;

    loading: boolean;

    pageSizeOptions: number[] = [5, 10, 25, 50];
    currentPage: number = 1;
    pageSize: number = 5;
    totalRecords: number = 0;
    first: number = 0;


    constructor(
        private usersService: UsersService,
        private messageService: MessageService,
        // protected router: Router,
        private primengConfig: PrimeNGConfig
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
        // this.loadUsers();

        this.loading = true
        this.primengConfig.ripple = true;
    }

    loadUsers(options: any){ // TODO - Type
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

    // clear(table: Table) {
    //     table.clear();
    // }

    // TODO - This triggers on pagination, ordering and filtering
    onChange(event: LazyLoadEvent): void {
        console.log("Event - ", event);
        this.first = event.first;

        const options = {
            pageSize: event.rows,
            page: this.first / this.pageSize + 1,
            sortOrder: event.sortOrder,
            sortField: event.sortField,
            filters: JSON.stringify(event.filters)
        }

        this.pageSize = event.rows;
        this.currentPage = this.first / this.pageSize + 1;

        this.loadUsers(options);
    }

    // TODO
    // onGlobalFilter(table: Table, event: Event) {
    //     table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    // }


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
