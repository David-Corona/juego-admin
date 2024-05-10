import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { AuthService } from '../shared/auth.service';

@Component({
//   selector: 'app-forgot-password',
//   standalone: true,
//   imports: [],
  templateUrl: './forgot-password.component.html',
  providers: [MessageService]
})
export class ForgotPasswordComponent {

    constructor(
        private authService: AuthService,
        private messageService: MessageService,
      ) { }


}
