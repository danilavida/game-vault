import { Component, Input, OnInit } from '@angular/core'
import { CommonModule } from '@angular/common'
import { Game } from '../../models/game.model'

@Component({
    selector: 'app-game-card',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './game-card.component.html',
    styleUrls: ['./game-card.component.scss']
})
export class GameCardComponent implements OnInit {
    @Input() game: Game | null = null

    ratingStars: boolean[] = []

    constructor() {}

    ngOnInit(): void {
        this.setRatingStars()
    }

    ngOnChanges(): void {
        this.setRatingStars()
    }

    private setRatingStars(): void {
        this.ratingStars = []
        if (this.game && this.game.rating >= 0 && this.game.rating <= 5) {
            const fullStars = Math.floor(this.game.rating)

            for (let i = 0; i < fullStars; i++) {
                this.ratingStars.push(true)
            }

            for (let i = fullStars; i < 5; i++) {
                this.ratingStars.push(false)
            }
        } else {
            this.ratingStars = Array(5).fill(false)
        }
    }

    addToCart(event: Event): void {
        event.stopPropagation()
        if (this.game) {
            console.log(`Agregando ${this.game.title} al carrito`)
        }
    }

    viewGameDetails(): void {
        if (this.game) {
            console.log(`Viendo detalles de ${this.game.title}`)
        }
    }
}
