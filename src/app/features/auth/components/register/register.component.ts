// src/app/features/auth/components/register/register.component.ts
import { CommonModule } from '@angular/common'
import { Component, inject } from '@angular/core' // Importa inject
import { FormsModule, NgForm } from '@angular/forms'
import { Router, RouterLink } from '@angular/router' // Importa Router
import { UserService, User } from '../../../../shared/services/user.service' // Importa el servicio y la interfaz

@Component({
    selector: 'app-register',
    standalone: true,
    imports: [CommonModule, FormsModule, RouterLink],
    templateUrl: './register.component.html',
    styleUrl: './register.component.scss'
})
export class RegisterComponent {
    // Inyección de dependencias
    private userService = inject(UserService)
    private router = inject(Router)

    // Modelo de datos del formulario
    registerData = {
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    }

    passwordMismatch = false
    registrationError: string | null = null // Para mostrar errores del servicio

    onSubmit(registerForm: NgForm) {
        // Resetear error previo
        this.registrationError = null

        // Marcar campos como tocados para validación visual
        Object.values(registerForm.controls).forEach((control) => {
            control.markAsTouched()
        })

        // Validar si las contraseñas coinciden (ya tenías esta lógica)
        this.checkPasswords(registerForm)
        if (this.passwordMismatch) {
            console.error('Las contraseñas no coinciden')
            // Podrías asignar un error específico si quieres
            // this.registrationError = 'Las contraseñas no coinciden.';
            return
        }

        // Validar el formulario completo con NgForm
        if (registerForm.invalid) {
            console.error('Formulario inválido')
            this.registrationError = 'Por favor, completa todos los campos correctamente.'
            return
        }

        // --- Llamada al Servicio ---
        console.log('Intentando registrar con:', this.registerData)

        // Prepara los datos para el servicio (omitiendo confirmPassword)
        const userData: Omit<User, 'id'> = {
            username: this.registerData.username,
            email: this.registerData.email,
            password: this.registerData.password // Enviamos la contraseña al servicio
        }

        this.userService.registerUser(userData).subscribe({
            next: (response) => {
                // Verificar si la respuesta tiene un error devuelto por el servicio
                if ('error' in response) {
                    console.error('Error desde el servicio de registro:', response.error)
                    this.registrationError = response.error // Mostrar error específico (ej: email ya existe)
                } else {
                    // ¡Registro Exitoso!
                    console.log('Usuario registrado con éxito:', response)
                    alert('¡Cuenta creada con éxito! Serás redirigido al login.') // Mensaje temporal
                    registerForm.resetForm() // Limpiar formulario
                    this.router.navigate(['/login']) // Redirigir a la página de login
                }
            },
            error: (err) => {
                // Manejar errores inesperados (si el observable fallara por otra razón)
                console.error('Error inesperado durante el registro:', err)
                this.registrationError = 'Ocurrió un error inesperado. Inténtalo de nuevo.'
            }
        })
        // --- Fin Llamada al Servicio ---
    }

    // Función para verificar contraseñas (sin cambios)
    checkPasswords(form: NgForm) {
        if (form.controls['password'] && form.controls['confirmPassword']) {
            this.passwordMismatch =
                form.controls['password'].value !==
                    form.controls['confirmPassword'].value &&
                form.controls['confirmPassword'].touched // Solo marcar mismatch si se tocó el campo confirmar
        }
    }
}
