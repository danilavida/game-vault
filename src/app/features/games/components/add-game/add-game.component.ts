import { Component, inject } from '@angular/core'
import { CommonModule } from '@angular/common'
import { Router } from '@angular/router'
import { FormsModule, NgForm } from '@angular/forms'
import { GameService } from '../../../../shared/services/game.service'
import { Game } from '../../../../shared/models/game.model'

@Component({
    selector: 'app-add-game',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './add-game.component.html',
    styleUrls: ['./add-game.component.scss']
})
export class AddGameComponent {
    private gameService = inject(GameService)
    private router = inject(Router)

    addGameData: Omit<Game, 'id'> = {
        title: '',
        description: '',
        releaseDate: '',
        image: '',
        rating: 0,
        downloads: 0,
        comingSoon: false
    }

    constructor() {}

    onSubmit(addGameForm: NgForm): void {
        Object.values(addGameForm.controls).forEach((control) => {
            control.markAsTouched()
        })

        if (addGameForm.invalid) {
            console.log('Formulario inválido.')
            alert('Por favor, revisa los campos del formulario.')
            return
        }

        console.log('Formulario válido, datos:', this.addGameData)

        const gameData: Omit<Game, 'id'> = {
            ...this.addGameData,
            image:
                this.addGameData.image ||
                'https://placehold.co/600x400/cccccc/ffffff?text=No+Image',
            rating: Number(this.addGameData.rating),
            downloads: Number(this.addGameData.downloads),
            comingSoon: Boolean(this.addGameData.comingSoon)
        }

        this.gameService.addGame(gameData)

        alert('¡Videojuego agregado con éxito!')

        this.router.navigate(['/home'])
    }

    cancel(): void {
        this.router.navigate(['/home'])
    }
}
