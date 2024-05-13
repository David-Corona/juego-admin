import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, AbstractControlOptions, ValidationErrors, AbstractControl  } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { AuthService } from '../shared/auth.service';
import { RegistrationData } from '../shared/auth.model';



@Component({
//   selector: 'app-register',
//   standalone: true,
//   imports: [],
  templateUrl: './register.component.html',
  providers: [MessageService]
})
export class RegisterComponent implements OnInit {

    registerForm: FormGroup;

    constructor(
        private authService: AuthService,
        private messageService: MessageService,
        private formBuilder: FormBuilder,
        private router: Router,
    ) { }

    ngOnInit(): void {
        this.initForm();
    }

    // onReset() {
    //     this.registerForm.reset();
    // }

    initForm(): void {
        this.registerForm = this.formBuilder.group({
            nombre: ['', [Validators.required, Validators.minLength(6)]],
            email: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)]],
            password: ['', [
                Validators.required,
                //Validators.minLength(8), // regex without minLength check: /^(?=[^A-Z]*[A-Z])(?=[^a-z]*[a-z])(?=\D*\d)/
                Validators.pattern(/^(?=[^A-Z]*[A-Z])(?=[^a-z]*[a-z])(?=\D*\d).{8,}$/) // /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/
            ]],
            confirmPassword: ['', Validators.required],
            acceptTerms: [false, Validators.requiredTrue]
        },
        { validator: this.passwordMatchValidator } as AbstractControlOptions
        );
    }

    registerAccount() {
        if (this.registerForm.valid) {
            const registrationData = this.getRegistrationData();
            this.authService.register(registrationData).subscribe({
                next: () => {
                    this.messageService.add({ severity: 'success', summary: '¡Éxito!', detail: 'Registrado correctamente'});
                    this.router.navigate(['/auth/login']);
                },
                error: e => {
                    console.error("Error al crear la cuenta: ", e);
                    this.messageService.add({ severity: 'error', summary: '¡Error!', detail: 'Error al registrarse'});
                }
              });

        }
    }

    getRegistrationData(): RegistrationData {
        return {
            nombre: this.registerForm.get('nombre').value,
            email: this.registerForm.get('email').value,
            password: this.registerForm.get('password').value,
        };
    }

    passwordMatchValidator(control: AbstractControl): ValidationErrors  | null {
        const password = control.get('password');
        const confirmPassword = control.get('confirmPassword');
        if (password.value !== confirmPassword.value) {
            confirmPassword.setErrors({ passwordMismatch: true });
            return { passwordMismatch: true };
        } else {
            confirmPassword.setErrors(null);
        }
        return null;
    }




}
