import { Component } from '@angular/core'
import { CommonModule } from '@angular/common'
import { Router } from '@angular/router' // Import Router for logout navigation

@Component({
    selector: 'app-home',
    standalone: true,
    imports: [CommonModule], // CommonModule is usually needed for directives like *ngFor
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'] // Corrected property name to styleUrls
})
export class HomeComponent {
    // Placeholder data for game cards
    // Replace with actual data fetching later
    gameCards = Array(8).fill({
        title: 'Título del Juego Placeholder'
        // Add other properties as needed for the real cards later
    })

    constructor(private router: Router) {} // Inject Router

    // Method for handling logout
    logout(): void {
        console.log('Cerrando sesión...')
        // Add actual logout logic here (e.g., clear token, call auth service)
        this.router.navigate(['/login']) // Navigate back to login screen
    }

    // Placeholder methods for navigation items if they need logic
    goToPopular(): void {
        console.log('Navegando a Más Populares...')
        // Add navigation logic if these are separate routes/views
    }

    goToDownloaded(): void {
        console.log('Navegando a Más Descargados...')
    }

    goToUpcoming(): void {
        console.log('Navegando a Próximamente...')
    }

    goToAdd(): void {
        console.log('Navegando a Agregar...')
        // Example: Navigate to an 'add-game' route if it exists
        // this.router.navigate(['/add-game']);
    }
}
