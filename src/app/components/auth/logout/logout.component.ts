import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { AuthService } from '../shared/auth.service';

@Component({
//   selector: 'app-logout',
//   standalone: true,
//   imports: [],
  templateUrl: './logout.component.html',
  providers: [MessageService]
})
export class LogoutComponent {



    constructor(
        private authService: AuthService,
        private messageService: MessageService,
    ) { }



}
