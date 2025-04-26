import { CommonModule } from '@angular/common'
import { Component, inject } from '@angular/core'
import { FormsModule, NgForm } from '@angular/forms'
import { Router, RouterLink } from '@angular/router'
import { UserService } from '../../../../shared/services/user.service'

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [CommonModule, FormsModule, RouterLink],
    templateUrl: './login.component.html',
    styleUrl: './login.component.scss'
})
export class LoginComponent {
    private userService = inject(UserService)
    private router = inject(Router)

    loginData = {
        email: '',
        password: ''
    }

    loginError: string | null = null

    onSubmit(loginForm: NgForm) {
        this.loginError = null

        Object.values(loginForm.controls).forEach((control) => {
            control.markAsTouched()
        })

        if (loginForm.invalid) {
            console.error('Formulario de login inválido')
            this.loginError = 'Por favor, ingresa tu correo y contraseña.'
            return
        }

        console.log('Intentando iniciar sesión con:', this.loginData.email)

        this.userService.login(this.loginData.email, this.loginData.password).subscribe({
            next: (response) => {
                if ('error' in response) {
                    console.error('Error desde el servicio de login:', response.error)
                    this.loginError = response.error
                } else {
                    console.log('Login exitoso, usuario:', response)

                    this.router.navigate(['/home'])
                }
            },
            error: (err) => {
                console.error('Error inesperado durante el login:', err)
                this.loginError = 'Ocurrió un error inesperado. Inténtalo de nuevo.'
            }
        })
    }
}
