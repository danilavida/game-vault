// src/app/features/home/components/home/home.component.ts
import { Component, OnInit, OnDestroy, inject } from '@angular/core' // Añade OnDestroy
import { CommonModule } from '@angular/common'
import { Router } from '@angular/router'
import { Game } from '../../../../shared/models/game.model'
import { GameCardComponent } from '../../../../shared/components/game-card/game-card.component'
import { GameService } from '../../../../shared/services/game.service' // Importa GameService
import { Subscription } from 'rxjs' // Importa Subscription

@Component({
    selector: 'app-home',
    standalone: true,
    imports: [CommonModule, GameCardComponent],
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
    // Implementa OnDestroy

    // --- Ya no necesitamos la lista hardcodeada aquí ---
    // allGameCards: Game[] = [ ... ];

    private gameService = inject(GameService) // Inyecta GameService
    private router = inject(Router)

    allGames: Game[] = [] // Lista para almacenar todos los juegos del servicio
    displayedGames: Game[] = []
    activeFilter: 'all' | 'popular' | 'downloaded' | 'upcoming' | 'add' = 'all'

    private gamesSubscription: Subscription | null = null // Para manejar la suscripción

    constructor() {} // El constructor puede estar vacío si usas inject()

    ngOnInit(): void {
        // Suscríbete al observable de juegos del servicio
        this.gamesSubscription = this.gameService.games$.subscribe((games) => {
            console.log('Juegos recibidos del servicio:', games)
            this.allGames = games // Guarda la lista completa
            // Vuelve a aplicar el filtro activo cada vez que la lista cambie
            // o simplemente muestra todos por defecto la primera vez
            if (this.activeFilter === 'all') {
                this.showAllGames()
            } else {
                this.applyCurrentFilter() // Necesitamos un método para reaplicar el filtro
            }
        })
    }

    ngOnDestroy(): void {
        // Desuscríbete para evitar fugas de memoria
        this.gamesSubscription?.unsubscribe()
    }

    // Método para reaplicar el filtro actual cuando los datos cambian
    applyCurrentFilter(): void {
        switch (this.activeFilter) {
            case 'popular':
                this.filterPopular()
                break
            case 'downloaded':
                this.filterDownloaded()
                break
            case 'upcoming':
                this.filterUpcoming()
                break
            case 'add':
                this.displayedGames = []
                break // O manejar como corresponda
            default:
                this.showAllGames() // Incluye 'all'
        }
    }

    showAllGames(): void {
        // Ahora ordena la lista obtenida del servicio
        this.displayedGames = [...this.allGames].sort((a, b) =>
            a.title.localeCompare(b.title)
        )
        this.activeFilter = 'all'
        console.log('Mostrando todos los juegos (ordenados por título)')
    }

    filterPopular(): void {
        // Filtra y ordena desde this.allGames
        this.displayedGames = this.allGames
            .filter((game) => game.rating > 4)
            .sort((a, b) => b.rating - a.rating)
        this.activeFilter = 'popular'
        console.log('Filtrando por populares (rating > 4, orden descendente)')
    }

    filterDownloaded(): void {
        // Filtra y ordena desde this.allGames
        this.displayedGames = this.allGames
            .filter((game) => (game.downloads ?? 0) > 100)
            .sort((a, b) => (b.downloads ?? 0) - (a.downloads ?? 0))
        this.activeFilter = 'downloaded'
        console.log('Filtrando por más descargados (downloads > 100, orden descendente)')
    }

    filterUpcoming(): void {
        // Filtra y ordena desde this.allGames
        this.displayedGames = this.allGames
            .filter((game) => game.comingSoon === true)
            .sort((a, b) => a.releaseDate.localeCompare(b.releaseDate))
        this.activeFilter = 'upcoming'
        console.log('Filtrando por próximamente (comingSoon = true, ordenado por fecha)')
    }

    navigateToAdd(): void {
        // --- ACTUALIZADO: Navegar a la ruta ---
        this.router.navigate(['/add-game'])
        // Ya no necesitamos cambiar activeFilter aquí ni limpiar displayedGames manualmente
    }

    logout(): void {
        console.log('Cerrando sesión...')
        this.router.navigate(['/login'])
    }

    trackByGameId(index: number, game: Game): string | number {
        // console.log('Tracking game:', game.id ?? game.title); // Log opcional
        return game.id ?? game.title
    }
}
