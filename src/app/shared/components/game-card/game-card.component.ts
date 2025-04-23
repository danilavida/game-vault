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
        // Calculate rating stars when the component initializes or when game data is available
        this.setRatingStars()
    }

    // Optional: Recalculate stars if the input changes after initialization
    ngOnChanges(): void {
        this.setRatingStars()
    }

    /**
     * Sets the ratingStars array based on the game's rating.
     */
    private setRatingStars(): void {
        this.ratingStars = [] // Reset stars
        if (this.game && this.game.rating >= 0 && this.game.rating <= 5) {
            const fullStars = Math.floor(this.game.rating)
            // Add full stars
            for (let i = 0; i < fullStars; i++) {
                this.ratingStars.push(true)
            }
            // Add empty stars
            for (let i = fullStars; i < 5; i++) {
                this.ratingStars.push(false)
            }
        } else {
            // Default to 5 empty stars if rating is invalid or game is null
            this.ratingStars = Array(5).fill(false)
        }
    }

    // Placeholder for add to cart action
    addToCart(event: Event): void {
        event.stopPropagation() // Prevent card click event if needed
        if (this.game) {
            console.log(`Agregando ${this.game.title} al carrito`)
            // Implement actual add to cart logic here
        }
    }

    // Placeholder for card click action
    viewGameDetails(): void {
        if (this.game) {
            console.log(`Viendo detalles de ${this.game.title}`)
            // Implement navigation to game detail page here
            // e.g., this.router.navigate(['/game', this.game.id]);
        }
    }
}
