// src/app/features/auth/components/login/login.component.ts
import { CommonModule } from '@angular/common'
import { Component, inject } from '@angular/core' // Importa inject
import { FormsModule, NgForm } from '@angular/forms' // Importa NgForm
import { Router, RouterLink } from '@angular/router' // Importa Router y RouterLink
import { UserService } from '../../../../shared/services/user.service' // Importa el servicio

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [CommonModule, FormsModule, RouterLink], // Añade RouterLink
    templateUrl: './login.component.html',
    styleUrl: './login.component.scss'
})
export class LoginComponent {
    // Inyección de dependencias
    private userService = inject(UserService)
    private router = inject(Router)

    // Modelo para los datos del formulario
    loginData = {
        email: '',
        password: ''
    }

    loginError: string | null = null // Para mostrar errores

    // El argumento loginForm se obtiene de la referencia #loginForm en el HTML
    onSubmit(loginForm: NgForm) {
        this.loginError = null // Limpiar error previo

        // Marcar campos como tocados
        Object.values(loginForm.controls).forEach((control) => {
            control.markAsTouched()
        })

        // Validar formulario
        if (loginForm.invalid) {
            console.error('Formulario de login inválido')
            this.loginError = 'Por favor, ingresa tu correo y contraseña.'
            return
        }

        console.log('Intentando iniciar sesión con:', this.loginData.email)

        // --- Llamada al Servicio ---
        this.userService.login(this.loginData.email, this.loginData.password).subscribe({
            next: (response) => {
                // Verificar si la respuesta indica un error del servicio
                if ('error' in response) {
                    console.error('Error desde el servicio de login:', response.error)
                    this.loginError = response.error // Mostrar error (ej: datos inválidos)
                } else {
                    // ¡Login Exitoso!
                    console.log('Login exitoso, usuario:', response)
                    // No es necesario resetear el form aquí
                    this.router.navigate(['/home']) // Redirigir a la página principal
                }
            },
            error: (err) => {
                // Manejar errores inesperados
                console.error('Error inesperado durante el login:', err)
                this.loginError = 'Ocurrió un error inesperado. Inténtalo de nuevo.'
            }
        })
        // --- Fin Llamada al Servicio ---
    }
}
