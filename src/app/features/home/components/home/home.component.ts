import { Component, OnInit } from '@angular/core'
import { CommonModule } from '@angular/common'
import { Router } from '@angular/router'
import { Game } from '../../../../shared/models/game.model'
import { GameCardComponent } from '../../../../shared/components/game-card/game-card.component'

@Component({
    selector: 'app-home',
    standalone: true,
    imports: [CommonModule, GameCardComponent],
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
    allGameCards: Game[] = [
        {
            title: 'The Soccer 2024',
            description:
                'Es un videojuego de fútbol desarrollado por freeDev, está próximo a ser lanzado para las plataformas más populares...',
            releaseDate: '29/octubre/2024',
            image: 'https://placehold.co/600x400/001f3f/FFF?text=Game+Image+1',
            rating: 5, // > 4
            downloads: 15000,
            comingSoon: false
        },
        {
            title: 'Aventura Espacial X',
            description:
                'Explora galaxias desconocidas en este emocionante juego de ciencia ficción. Pilota tu nave, comercia con alienígenas...',
            releaseDate: '15/mayo/2024',
            image: 'https://placehold.co/600x400/17a2b8/FFF?text=Game+Image+2',
            rating: 4.9, // <= 4
            downloads: 8500,
            comingSoon: false
        },
        {
            title: 'Mundo de Fantasía RPG',
            description:
                'Sumérgete en un vasto mundo de magia, dragones y héroes. Personaliza tu personaje y embárcate en misiones épicas.',
            releaseDate: '01/enero/2025',
            image: 'https://placehold.co/600x400/ffc107/000?text=Game+Image+3',
            rating: 4.8, // > 4
            downloads: 0,
            comingSoon: true
        },
        {
            title: 'Carreras Urbanas Nitro',
            description:
                'Compite en carreras callejeras ilegales por la ciudad. Modifica tu coche y demuestra quién es el rey del asfalto.',
            releaseDate: '10/marzo/2024',
            image: 'https://placehold.co/600x400/dc3545/FFF?text=Game+Image+4',
            rating: 4.7, // <= 4
            downloads: 11200,
            comingSoon: false
        },
        {
            title: 'Puzzle Quest Deluxe',
            description:
                'Resuelve cientos de ingeniosos puzzles en este adictivo juego. Desbloquea nuevos niveles y desafíos.',
            releaseDate: '05/febrero/2024',
            image: 'https://placehold.co/600x400/28a745/FFF?text=Game+Image+5',
            rating: 4.6, // > 4
            downloads: 25000,
            comingSoon: false
        },
        {
            title: 'Simulador de Granja Feliz',
            description:
                'Cultiva tus propios vegetales, cría animales y expande tu granja en este relajante simulador.',
            releaseDate: '20/abril/2024',
            image: 'https://placehold.co/600x400/6c757d/FFF?text=Game+Image+6',
            rating: 3, // > 4
            downloads: 9800,
            comingSoon: false
        },
        {
            title: 'Plataformas Pixeladas',
            description:
                'Un clásico juego de plataformas con estética retro. Salta, corre y derrota enemigos para salvar el reino.',
            releaseDate: '01/junio/2024',
            image: 'https://placehold.co/600x400/001f3f/FFF?text=Game+Image+7',
            rating: 2, // > 4
            downloads: 13000,
            comingSoon: false
        },
        {
            title: 'Horror Cósmico: El Despertar',
            description:
                'Investiga extraños sucesos en una estación espacial abandonada. ¿Podrás sobrevivir a los horrores que acechan?',
            releaseDate: '31/octubre/2024',
            image: 'https://placehold.co/600x400/343a40/FFF?text=Game+Image+8',
            rating: 1.5, // <= 4
            downloads: 500,
            comingSoon: false
        }
    ]

    displayedGames: Game[] = []
    activeFilter: 'all' | 'popular' | 'downloaded' | 'upcoming' | 'add' = 'all'

    constructor(private router: Router) {}

    ngOnInit(): void {
        this.showAllGames()
    }

    showAllGames(): void {
        // Ordenar por título alfabéticamente como ejemplo por defecto
        this.displayedGames = [...this.allGameCards].sort((a, b) =>
            a.title.localeCompare(b.title)
        )
        this.activeFilter = 'all'
        console.log('Mostrando todos los juegos (ordenados por título)')
    }

    filterPopular(): void {
        // Filtrar y LUEGO ordenar por rating descendente
        this.displayedGames = this.allGameCards
            .filter((game) => game.rating > 4)
            .sort((a, b) => b.rating - a.rating) // <-- Orden descendente por rating
        this.activeFilter = 'popular'
        console.log('Filtrando por populares (rating > 4, orden descendente)')
    }

    filterDownloaded(): void {
        this.displayedGames = this.allGameCards
            .filter((game) => (game.downloads ?? 0) > 0) // Mostrar si tiene alguna descarga
            .sort((a, b) => (b.downloads ?? 0) - (a.downloads ?? 0)) // Ordenar por descargas
        this.activeFilter = 'downloaded'
        console.log('Filtrando por más descargados (orden descendente)')
    }

    filterUpcoming(): void {
        this.displayedGames = this.allGameCards
            .filter((game) => game.comingSoon === true)
            .sort((a, b) => a.releaseDate.localeCompare(b.releaseDate)) // Ordenar por fecha (simple)
        this.activeFilter = 'upcoming'
        console.log('Filtrando por próximamente (ordenado por fecha)')
    }

    navigateToAdd(): void {
        this.activeFilter = 'add'
        console.log('Navegando/Activando sección Agregar...')
        // this.router.navigate(['/add-game']);
        // this.displayedGames = []; // Limpiar si no se navega
    }

    logout(): void {
        console.log('Cerrando sesión...')
        this.router.navigate(['/login'])
    }
}
