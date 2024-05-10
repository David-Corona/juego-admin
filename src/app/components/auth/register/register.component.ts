import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { AuthService } from '../shared/auth.service';

@Component({
//   selector: 'app-register',
//   standalone: true,
//   imports: [],
  templateUrl: './register.component.html',
  providers: [MessageService]
})
export class RegisterComponent {

    constructor(
        private authService: AuthService,
        private messageService: MessageService,
    ) { }



}
