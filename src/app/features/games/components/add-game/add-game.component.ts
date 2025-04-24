// src/app/features/games/components/add-game/add-game.component.ts
import { Component, inject } from '@angular/core'
import { CommonModule } from '@angular/common'
import { Router } from '@angular/router'
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms' // Importa ReactiveFormsModule y clases necesarias
import { GameService } from '../../../../shared/services/game.service' // Ajusta la ruta
import { Game } from '../../../../shared/models/game.model' // Ajusta la ruta

@Component({
    selector: 'app-add-game',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule], // Añade ReactiveFormsModule
    templateUrl: './add-game.component.html',
    styleUrls: ['./add-game.component.scss']
})
export class AddGameComponent {
    // Inyección de dependencias moderna con inject()
    private fb = inject(FormBuilder)
    private gameService = inject(GameService)
    private router = inject(Router)

    addGameForm: FormGroup

    constructor() {
        // Define el formulario reactivo
        this.addGameForm = this.fb.group({
            // Nombres de control coinciden con la interfaz Game (excepto id)
            title: ['', [Validators.required, Validators.minLength(3)]],
            description: ['', [Validators.required, Validators.maxLength(500)]],
            releaseDate: ['', Validators.required], // Podría mejorarse con validación de fecha
            image: [''], // URL de imagen, opcional por ahora
            rating: [0, [Validators.required, Validators.min(0), Validators.max(5)]],
            downloads: [0, [Validators.required, Validators.min(0)]],
            comingSoon: [false] // Checkbox, valor inicial false
            // Campos opcionales de la interfaz Game (puedes añadirlos si los necesitas)
            // price: [null],
            // genres: [[]],
            // platforms: [[]]
        })
    }

    onSubmit(): void {
        // Marcar todos los campos como 'touched' para mostrar errores si los hay
        this.addGameForm.markAllAsTouched()

        if (this.addGameForm.valid) {
            console.log('Formulario válido:', this.addGameForm.value)
            // Crear el objeto juego (asegúrate que coincide con Omit<Game, 'id'>)
            const gameData: Omit<Game, 'id'> = {
                title: this.addGameForm.value.title,
                description: this.addGameForm.value.description,
                releaseDate: this.addGameForm.value.releaseDate,
                image:
                    this.addGameForm.value.image ||
                    'https://placehold.co/600x400/cccccc/ffffff?text=No+Image', // Placeholder si está vacío
                rating: Number(this.addGameForm.value.rating), // Asegurar que es número
                downloads: Number(this.addGameForm.value.downloads), // Asegurar que es número
                comingSoon: Boolean(this.addGameForm.value.comingSoon) // Asegurar que es booleano
                // Asignar otros campos si los añadiste al formulario
                // price: this.addGameForm.value.price,
                // genres: this.addGameForm.value.genres,
                // platforms: this.addGameForm.value.platforms,
            }

            // Llamar al servicio para agregar el juego
            this.gameService.addGame(gameData)

            // Opcional: Mostrar mensaje de éxito (con un servicio de notificaciones o simple alert)
            alert('¡Videojuego agregado con éxito!')

            // Navegar de vuelta a la página principal (o a donde prefieras)
            this.router.navigate(['/home']) // Ajusta la ruta si es diferente
        } else {
            console.log('Formulario inválido.')
            // Opcional: Mostrar mensaje de error general
            alert('Por favor, revisa los campos del formulario.')
        }
    }

    cancel(): void {
        this.router.navigate(['/home']) // Navega usando el router privado
    }

    // Métodos helper para acceder fácilmente a los controles en el template (opcional)
    get title() {
        return this.addGameForm.get('title')
    }
    get description() {
        return this.addGameForm.get('description')
    }
    get releaseDate() {
        return this.addGameForm.get('releaseDate')
    }
    get rating() {
        return this.addGameForm.get('rating')
    }
    get downloads() {
        return this.addGameForm.get('downloads')
    }
}
