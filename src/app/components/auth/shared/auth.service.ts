import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { RegistrationData } from './auth.model';

const API_URL_AUTH = environment.apiURL + "/admin/auth";

@Injectable({
    providedIn: 'root'
  })
  export class AuthService {

    constructor(
        private http: HttpClient
    ) { }



    register(usuarioInfo: RegistrationData): Observable<any> {
        return this.http.post<any>(API_URL_AUTH + "/registro", usuarioInfo);
    }

    // router.post("/login", checkRole, UserAuthController.login);
    // router.post("/refresh-token", UserAuthController.refreshToken);
    // router.post("/logout", checkRole, UserAuthController.logout);
    // router.post("/forgot-password", checkRole, UserAuthController.forgotPassword);
    // router.post("/reset-password", checkRole, UserAuthController.resetPassword);


  }
