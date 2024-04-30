import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';


const API_URL_USUARIOS = environment.apiURL + "/admin/usuarios";

@Injectable({
  providedIn: 'root'
})
export class UsersService {


    constructor(
        private http: HttpClient
    ) { }


    getUsuarios(): Observable<any> {
        return this.http.get<any>(API_URL_USUARIOS);
    }

    createUsuario(usuario: any): Observable<any> {
        return this.http.post<any>(API_URL_USUARIOS + '/create', usuario);
    }

    deleteUsuarios(ids: number[]): Observable<any> {
        return this.http.post<any>(API_URL_USUARIOS + '/delete', ids );
    }


}
