// src/app/features/games/components/add-game/add-game.component.ts
import { Component, inject } from '@angular/core'
import { CommonModule } from '@angular/common'
import { Router } from '@angular/router'
import { FormsModule, NgForm } from '@angular/forms' // Importa FormsModule y NgForm
import { GameService } from '../../../../shared/services/game.service' // Ajusta la ruta
import { Game } from '../../../../shared/models/game.model' // Ajusta la ruta

@Component({
    selector: 'app-add-game',
    standalone: true,
    imports: [CommonModule, FormsModule], // Cambiado a FormsModule
    templateUrl: './add-game.component.html',
    styleUrls: ['./add-game.component.scss'] // Apunta a los nuevos estilos
})
export class AddGameComponent {
    // Inyección de dependencias
    private gameService = inject(GameService)
    private router = inject(Router)

    // Objeto para almacenar los datos del formulario con ngModel
    addGameData: Omit<Game, 'id'> = {
        title: '',
        description: '',
        releaseDate: '',
        image: '',
        rating: 0,
        downloads: 0,
        comingSoon: false
        // Inicializa otros campos opcionales si los usas
        // price: undefined,
        // genres: [],
        // platforms: []
    }

    constructor() {} // Constructor vacío, no se necesita FormBuilder

    onSubmit(addGameForm: NgForm): void {
        // Marcar todos los campos como 'touched' para mostrar errores
        Object.values(addGameForm.controls).forEach((control) => {
            control.markAsTouched()
        })

        // Verificar si el formulario es válido
        if (addGameForm.invalid) {
            console.log('Formulario inválido.')
            alert('Por favor, revisa los campos del formulario.')
            return // Detener si no es válido
        }

        console.log('Formulario válido, datos:', this.addGameData)

        // Preparar datos (asegurando tipos correctos si es necesario)
        const gameData: Omit<Game, 'id'> = {
            ...this.addGameData,
            image:
                this.addGameData.image ||
                'https://placehold.co/600x400/cccccc/ffffff?text=No+Image', // Placeholder
            rating: Number(this.addGameData.rating),
            downloads: Number(this.addGameData.downloads),
            comingSoon: Boolean(this.addGameData.comingSoon)
        }

        // Llamar al servicio para agregar el juego
        this.gameService.addGame(gameData)

        alert('¡Videojuego agregado con éxito!')

        // Navegar de vuelta a la página principal
        this.router.navigate(['/home'])

        // Opcional: Resetear el formulario
        // addGameForm.resetForm({ rating: 0, downloads: 0, comingSoon: false }); // Resetea a valores iniciales
    }

    // Método para el botón cancelar (ya lo tenías)
    cancel(): void {
        this.router.navigate(['/home'])
    }
}
