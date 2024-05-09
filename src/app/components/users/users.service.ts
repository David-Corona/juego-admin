import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { buildQueryParams } from '../../utils/http-utils';


const API_URL_USUARIOS = environment.apiURL + "/admin/usuarios";



@Injectable({
  providedIn: 'root'
})
export class UsersService {


    constructor(
        private http: HttpClient
    ) { }


    getUsuarios(options: any): Observable<any> { // TODO - Types
        console.log("Options - ", options);
        const params = buildQueryParams(options)
        return this.http.get<any>(`${API_URL_USUARIOS}?${params}`);
    }

    createUsuario(usuario: any): Observable<any> {
        return this.http.post<any>(API_URL_USUARIOS + '/create', usuario);
    }

    updateUsuario(usuario: any): Observable<any> {
        return this.http.patch<any>(`${API_URL_USUARIOS}/update/${usuario.id}`, usuario);
    }

    deleteUsuarios(ids: number[]): Observable<any> {
        return this.http.post<any>(API_URL_USUARIOS + '/delete', ids );
    }



}
