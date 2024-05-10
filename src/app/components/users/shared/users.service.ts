import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { buildQueryParams } from '../../../shared/utils/http.utils';
import { QueryOptions } from 'src/app/shared/models/shared.model';
import { User, UserResponse, UsersResponse, MessageResponse } from './users.model';


const API_URL_USUARIOS = environment.apiURL + "/admin/usuarios";


@Injectable({
  providedIn: 'root'
})
export class UsersService {


    constructor(
        private http: HttpClient
    ) { }


    getUsuarios(options: QueryOptions): Observable<UsersResponse> {
        console.log("Options - ", options);
        const params = buildQueryParams(options)
        return this.http.get<UsersResponse>(`${API_URL_USUARIOS}?${params}`);
    }

    createUsuario(usuario: User): Observable<UserResponse> {
        return this.http.post<UserResponse>(API_URL_USUARIOS + '/create', usuario);
    }

    updateUsuario(usuario: User): Observable<UserResponse> {
        return this.http.patch<UserResponse>(`${API_URL_USUARIOS}/update/${usuario.id}`, usuario);
    }

    deleteUsuarios(ids: number[]): Observable<MessageResponse> {
        return this.http.post<MessageResponse>(API_URL_USUARIOS + '/delete', ids);
    }

}
