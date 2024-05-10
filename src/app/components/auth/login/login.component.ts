import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { AuthService } from '../shared/auth.service';


interface UserLogin {
    email: string;
    password: string;
}

@Component({
//   standalone: true,
//   imports: [],
  templateUrl: './login.component.html',
  providers: [MessageService]
})
export class LoginComponent {

    user: UserLogin = {
        email: '',
        password: ''
    };

    constructor(
        private authService: AuthService,
        private messageService: MessageService,
      ) { }





}
