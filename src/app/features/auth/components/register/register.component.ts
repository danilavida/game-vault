import { CommonModule } from '@angular/common'
import { Component } from '@angular/core'
import { FormsModule, NgForm } from '@angular/forms'
import { RouterLink } from '@angular/router'

@Component({
    selector: 'app-register',
    standalone: true,
    imports: [CommonModule, FormsModule, RouterLink],
    templateUrl: './register.component.html',
    styleUrl: './register.component.scss'
})
export class RegisterComponent {
    registerData = {
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    }

    passwordMismatch = false

    onSubmit(registerForm: NgForm) {
        if (registerForm.invalid) {
            console.error('Formulario inválido')
            Object.values(registerForm.controls).forEach((control) => {
                control.markAsTouched()
            })
            return
        }

        if (this.registerData.password !== this.registerData.confirmPassword) {
            this.passwordMismatch = true
            console.error('Las contraseñas no coinciden')

            return
        }

        this.passwordMismatch = false
        console.log('Formulario de registro enviado:', this.registerData)

        registerForm.resetForm()
    }

    checkPasswords(form: NgForm) {
        if (form.controls['password'] && form.controls['confirmPassword']) {
            this.passwordMismatch =
                form.controls['password'].value !==
                    form.controls['confirmPassword'].value &&
                form.controls['confirmPassword'].touched
        }
    }
}
