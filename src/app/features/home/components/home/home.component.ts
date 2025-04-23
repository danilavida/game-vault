import { Component } from '@angular/core'
import { CommonModule } from '@angular/common'
import { Router } from '@angular/router'
// 1. Importar la interfaz Game y el componente GameCardComponent
import { Game } from '../../../../shared/models/game.model' // Ajusta la ruta si es necesario
import { GameCardComponent } from '../../../../shared/components/game-card/game-card.component' // Ajusta la ruta si es necesario

@Component({
    selector: 'app-home',
    standalone: true,
    // 2. Añadir GameCardComponent a los imports
    imports: [CommonModule, GameCardComponent],
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent {
    // 3. Crear datos de ejemplo (mock data) que sigan la interfaz Game
    gameCards: Game[] = [
        {
            title: 'The Soccer 2024', // Título actualizado
            description:
                'Es un videojuego de fútbol desarrollado por freeDev, está próximo a ser lanzado para las plataformas más populares...',
            releaseDate: '29/octubre/2024', // Fecha actualizada
            image: 'https://placehold.co/600x400/001f3f/FFF?text=Game+Image', // URL de imagen placeholder
            rating: 4.5, // Ejemplo de rating
            downloads: 15000, // Ejemplo de descargas
            comingSoon: false
        },
        {
            title: 'Aventura Espacial X',
            description:
                'Explora galaxias desconocidas en este emocionante juego de ciencia ficción. Pilota tu nave, comercia con alienígenas...',
            releaseDate: '15/mayo/2024',
            image: 'https://placehold.co/600x400/17a2b8/FFF?text=Space+Adventure',
            rating: 4.0,
            downloads: 8500,
            comingSoon: false
        },
        {
            title: 'Mundo de Fantasía RPG',
            description:
                'Sumérgete en un vasto mundo de magia, dragones y héroes. Personaliza tu personaje y embárcate en misiones épicas.',
            releaseDate: '01/enero/2025',
            image: 'https://placehold.co/600x400/ffc107/000?text=Fantasy+RPG',
            rating: 0, // Aún no lanzado
            downloads: 0,
            comingSoon: true // Marcado como próximamente
        },
        {
            title: 'Carreras Urbanas Nitro',
            description:
                'Compite en carreras callejeras ilegales por la ciudad. Modifica tu coche y demuestra quién es el rey del asfalto.',
            releaseDate: '10/marzo/2024',
            image: 'https://placehold.co/600x400/dc3545/FFF?text=Racing+Game',
            rating: 3.8,
            downloads: 11200,
            comingSoon: false
        },
        {
            title: 'Puzzle Quest Deluxe',
            description:
                'Resuelve cientos de ingeniosos puzzles en este adictivo juego. Desbloquea nuevos niveles y desafíos.',
            releaseDate: '05/febrero/2024',
            image: 'https://placehold.co/600x400/28a745/FFF?text=Puzzle+Game',
            rating: 4.7,
            downloads: 25000,
            comingSoon: false
        },
        // Añade más objetos Game aquí para tener 8 o más tarjetas
        // ... (Copia y modifica los anteriores para tener más ejemplos)
        {
            title: 'Simulador de Granja Feliz',
            description:
                'Cultiva tus propios vegetales, cría animales y expande tu granja en este relajante simulador.',
            releaseDate: '20/abril/2024',
            image: 'https://placehold.co/600x400/6c757d/FFF?text=Farm+Sim',
            rating: 4.2,
            downloads: 9800,
            comingSoon: false
        },
        {
            title: 'Plataformas Pixeladas',
            description:
                'Un clásico juego de plataformas con estética retro. Salta, corre y derrota enemigos para salvar el reino.',
            releaseDate: '01/junio/2024',
            image: 'https://placehold.co/600x400/001f3f/FFF?text=Pixel+Platformer',
            rating: 4.4,
            downloads: 13000,
            comingSoon: false
        },
        {
            title: 'Horror Cósmico: El Despertar',
            description:
                'Investiga extraños sucesos en una estación espacial abandonada. ¿Podrás sobrevivir a los horrores que acechan?',
            releaseDate: '31/octubre/2024',
            image: 'https://placehold.co/600x400/343a40/FFF?text=Cosmic+Horror',
            rating: 0, // Ejemplo sin rating aún
            downloads: 500, // Pocas descargas (quizás demo)
            comingSoon: false
        }
    ]

    constructor(private router: Router) {}

    logout(): void {
        console.log('Cerrando sesión...')
        this.router.navigate(['/login'])
    }

    goToPopular(): void {
        console.log('Navegando a Más Populares...')
    }

    goToDownloaded(): void {
        console.log('Navegando a Más Descargados...')
    }

    goToUpcoming(): void {
        console.log('Navegando a Próximamente...')
    }

    goToAdd(): void {
        console.log('Navegando a Agregar...')
    }
}
