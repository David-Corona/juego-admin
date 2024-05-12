import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControlOptions, ValidationErrors, AbstractControl  } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { AuthService } from '../shared/auth.service';



@Component({
//   selector: 'app-register',
//   standalone: true,
//   imports: [],
  templateUrl: './register.component.html',
  providers: [MessageService]
})
export class RegisterComponent implements OnInit {

    registerForm: FormGroup;
    submitted = false;

    constructor(
        private authService: AuthService,
        private messageService: MessageService,
        private formBuilder: FormBuilder
    ) { }

    ngOnInit(): void {
        this.initForm();
    }

    initForm(): void {
        this.registerForm = this.formBuilder.group({
            nombre: ['', [Validators.required, Validators.minLength(6)]],
            email: ['', [Validators.required, Validators.email]],
            password: ['', [
                Validators.required,
                //Validators.minLength(8), // regex without minLength check: /^(?=[^A-Z]*[A-Z])(?=[^a-z]*[a-z])(?=\D*\d)/
                Validators.pattern(/^(?=[^A-Z]*[A-Z])(?=[^a-z]*[a-z])(?=\D*\d).{8,}$/) // /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/
            ]],
            confirmPassword: ['', Validators.required],
            // acceptTerms: [false, Validators.requiredTrue]
        },
        { validator: this.passwordMatchValidator } as AbstractControlOptions
        );
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


    registerAccount() {
        this.submitted = true;

        console.log("Valid: ", this.registerForm.valid);
        console.log(this.registerForm);
        console.log("Values: ", this.registerForm.value);
        // if (this.registerForm.valid) {

        // }
    }

}
