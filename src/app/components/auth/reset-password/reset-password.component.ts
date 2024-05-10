import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { AuthService } from '../shared/auth.service';


@Component({
//   selector: 'app-reset-password',
//   standalone: true,
//   imports: [],
  templateUrl: './reset-password.component.html',
  providers: [MessageService]
})
export class ResetPasswordComponent {


    constructor(
        private authService: AuthService,
        private messageService: MessageService,
      ) { }


}
