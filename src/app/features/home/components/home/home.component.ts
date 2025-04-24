import { Component, OnInit } from '@angular/core' // Import OnInit
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
// Implement OnInit interface
export class HomeComponent implements OnInit {
    // 1. Propiedad para almacenar TODOS los juegos (fuente original)
    allGameCards: Game[] = [
        {
            title: 'The Soccer 2024',
            description:
                'Es un videojuego de fútbol desarrollado por freeDev, está próximo a ser lanzado para las plataformas más populares...',
            releaseDate: '29/octubre/2024',
            image: 'https://placehold.co/600x400/001f3f/FFF?text=Game+Image+1',
            rating: 4.5,
            downloads: 15000,
            comingSoon: false
        },
        {
            title: 'Aventura Espacial X',
            description:
                'Explora galaxias desconocidas en este emocionante juego de ciencia ficción. Pilota tu nave, comercia con alienígenas...',
            releaseDate: '15/mayo/2024',
            image: 'https://placehold.co/600x400/17a2b8/FFF?text=Game+Image+2',
            rating: 4.0, // Rating <= 4
            downloads: 8500,
            comingSoon: false
        },
        {
            title: 'Mundo de Fantasía RPG',
            description:
                'Sumérgete en un vasto mundo de magia, dragones y héroes. Personaliza tu personaje y embárcate en misiones épicas.',
            releaseDate: '01/enero/2025',
            image: 'https://placehold.co/600x400/ffc107/000?text=Game+Image+3',
            rating: 5.0, // Rating > 4
            downloads: 0,
            comingSoon: true
        },
        {
            title: 'Carreras Urbanas Nitro',
            description:
                'Compite en carreras callejeras ilegales por la ciudad. Modifica tu coche y demuestra quién es el rey del asfalto.',
            releaseDate: '10/marzo/2024',
            image: 'https://placehold.co/600x400/dc3545/FFF?text=Game+Image+4',
            rating: 3.8, // Rating <= 4
            downloads: 11200,
            comingSoon: false
        },
        {
            title: 'Puzzle Quest Deluxe',
            description:
                'Resuelve cientos de ingeniosos puzzles en este adictivo juego. Desbloquea nuevos niveles y desafíos.',
            releaseDate: '05/febrero/2024',
            image: 'https://placehold.co/600x400/28a745/FFF?text=Game+Image+5',
            rating: 4.7, // Rating > 4
            downloads: 25000,
            comingSoon: false
        },
        {
            title: 'Simulador de Granja Feliz',
            description:
                'Cultiva tus propios vegetales, cría animales y expande tu granja en este relajante simulador.',
            releaseDate: '20/abril/2024',
            image: 'https://placehold.co/600x400/6c757d/FFF?text=Game+Image+6',
            rating: 4.2, // Rating > 4
            downloads: 9800,
            comingSoon: false
        },
        {
            title: 'Plataformas Pixeladas',
            description:
                'Un clásico juego de plataformas con estética retro. Salta, corre y derrota enemigos para salvar el reino.',
            releaseDate: '01/junio/2024',
            image: 'https://placehold.co/600x400/001f3f/FFF?text=Game+Image+7',
            rating: 4.4, // Rating > 4
            downloads: 13000,
            comingSoon: false
        },
        {
            title: 'Horror Cósmico: El Despertar',
            description:
                'Investiga extraños sucesos en una estación espacial abandonada. ¿Podrás sobrevivir a los horrores que acechan?',
            releaseDate: '31/octubre/2024',
            image: 'https://placehold.co/600x400/343a40/FFF?text=Game+Image+8',
            rating: 3.5, // Rating <= 4
            downloads: 500,
            comingSoon: false
        }
    ]

    // 2. Propiedad para almacenar los juegos que se mostrarán en la UI
    displayedGames: Game[] = []

    // 3. Propiedad para rastrear el filtro activo
    activeFilter: 'all' | 'popular' | 'downloaded' | 'upcoming' | 'add' = 'all' // Inicialmente muestra todos

    constructor(private router: Router) {}

    // 4. Inicializar displayedGames en ngOnInit
    ngOnInit(): void {
        this.showAllGames() // Mostrar todos los juegos al iniciar
    }

    // 5. Método para mostrar todos los juegos
    showAllGames(): void {
        this.displayedGames = [...this.allGameCards] // Copia todos los juegos
        this.activeFilter = 'all' // Marca 'all' como activo
        console.log('Mostrando todos los juegos')
    }

    // 6. Método para filtrar por populares (rating > 4)
    filterPopular(): void {
        this.displayedGames = this.allGameCards.filter((game) => game.rating > 4)
        this.activeFilter = 'popular' // Marca 'popular' como activo
        console.log('Filtrando por populares (rating > 4)')
    }

    // 7. Método para filtrar por más descargados (ejemplo: > 10000 descargas)
    filterDownloaded(): void {
        // ¡OJO! La interfaz no tiene 'downloads' obligatorio, así que hay que manejar undefined
        this.displayedGames = this.allGameCards
            .filter((game) => (game.downloads ?? 0) > 10000)
            .sort((a, b) => (b.downloads ?? 0) - (a.downloads ?? 0)) // Ordenar descendente
        this.activeFilter = 'downloaded'
        console.log('Filtrando por más descargados (> 10000)')
    }

    // 8. Método para filtrar por próximamente (comingSoon = true)
    filterUpcoming(): void {
        this.displayedGames = this.allGameCards.filter((game) => game.comingSoon === true)
        this.activeFilter = 'upcoming'
        console.log('Filtrando por próximamente')
    }

    // 9. Método para la sección "Agregar" (podría navegar o cambiar estado)
    navigateToAdd(): void {
        this.activeFilter = 'add' // Marcar como activo aunque no filtre
        console.log('Navegando/Activando sección Agregar...')
        // Podrías navegar a otra ruta: this.router.navigate(['/add-game']);
        // O podrías mostrar un formulario en esta misma vista cambiando otro estado.
        // Por ahora, solo limpia los juegos mostrados como ejemplo si no navega:
        // this.displayedGames = []; // Opcional: limpiar vista si 'Agregar' no muestra juegos
    }

    logout(): void {
        console.log('Cerrando sesión...')
        this.router.navigate(['/login'])
    }
}
