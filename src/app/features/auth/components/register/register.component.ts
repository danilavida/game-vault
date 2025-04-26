import { CommonModule } from '@angular/common'
import { Component, inject } from '@angular/core'
import { FormsModule, NgForm } from '@angular/forms'
import { Router, RouterLink } from '@angular/router'
import { UserService, User } from '../../../../shared/services/user.service'

@Component({
    selector: 'app-register',
    standalone: true,
    imports: [CommonModule, FormsModule, RouterLink],
    templateUrl: './register.component.html',
    styleUrl: './register.component.scss'
})
export class RegisterComponent {
    private userService = inject(UserService)
    private router = inject(Router)

    registerData = {
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    }

    passwordMismatch = false
    registrationError: string | null = null

    onSubmit(registerForm: NgForm) {
        this.registrationError = null

        Object.values(registerForm.controls).forEach((control) => {
            control.markAsTouched()
        })

        this.checkPasswords(registerForm)
        if (this.passwordMismatch) {
            console.error('Las contraseñas no coinciden')

            return
        }

        if (registerForm.invalid) {
            console.error('Formulario inválido')
            this.registrationError = 'Por favor, completa todos los campos correctamente.'
            return
        }

        console.log('Intentando registrar con:', this.registerData)

        const userData: Omit<User, 'id'> = {
            username: this.registerData.username,
            email: this.registerData.email,
            password: this.registerData.password
        }

        this.userService.registerUser(userData).subscribe({
            next: (response) => {
                if ('error' in response) {
                    console.error('Error desde el servicio de registro:', response.error)
                    this.registrationError = response.error
                } else {
                    console.log('Usuario registrado con éxito:', response)
                    alert('¡Cuenta creada con éxito! Serás redirigido al login.')
                    registerForm.resetForm()
                    this.router.navigate(['/login'])
                }
            },
            error: (err) => {
                console.error('Error inesperado durante el registro:', err)
                this.registrationError = 'Ocurrió un error inesperado. Inténtalo de nuevo.'
            }
        })
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
