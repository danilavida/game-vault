import { CommonModule } from '@angular/common'
import { Component } from '@angular/core'
import { FormsModule, NgForm } from '@angular/forms' // Import NgForm for form reference
import { RouterLink } from '@angular/router' // Import RouterLink

@Component({
    selector: 'app-register', // Selector para el componente de registro
    standalone: true,
    imports: [CommonModule, FormsModule, RouterLink], // Añadir RouterLink a los imports
    templateUrl: './register.component.html',
    styleUrl: './register.component.scss' // Apunta a los estilos de registro
})
export class RegisterComponent {
    // Objeto para almacenar los datos del formulario (opcional pero útil)
    registerData = {
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    }

    // Variable para mensaje de error de contraseña no coincidente
    passwordMismatch = false

    onSubmit(registerForm: NgForm) {
        // Recibe NgForm como argumento
        if (registerForm.invalid) {
            console.error('Formulario inválido')
            // Marcar todos los campos como 'touched' para mostrar errores
            Object.values(registerForm.controls).forEach((control) => {
                control.markAsTouched()
            })
            return // Detener si el formulario no es válido
        }

        // Validar si las contraseñas coinciden
        if (this.registerData.password !== this.registerData.confirmPassword) {
            this.passwordMismatch = true
            console.error('Las contraseñas no coinciden')
            // Podrías marcar el campo confirmPassword como inválido aquí si lo deseas
            // registerForm.controls['confirmPassword'].setErrors({'mismatch': true});
            return // Detener si no coinciden
        }

        this.passwordMismatch = false // Resetear el error si coinciden
        console.log('Formulario de registro enviado:', this.registerData)
        // Aquí iría la lógica para enviar los datos al backend
        // Por ejemplo: this.authService.register(this.registerData).subscribe(...)

        // Opcional: Resetear formulario después de enviar
        // registerForm.resetForm();
    }

    // Función para verificar si las contraseñas coinciden mientras se escribe (opcional)
    checkPasswords(form: NgForm) {
        if (form.controls['password'] && form.controls['confirmPassword']) {
            this.passwordMismatch =
                form.controls['password'].value !==
                    form.controls['confirmPassword'].value &&
                form.controls['confirmPassword'].touched
        }
    }
}
