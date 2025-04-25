import { Component, OnInit, OnDestroy, inject } from '@angular/core'
import { CommonModule } from '@angular/common'
import { Router } from '@angular/router'
import { Game } from '../../../../shared/models/game.model'
import { GameCardComponent } from '../../../../shared/components/game-card/game-card.component'
import { GameService } from '../../../../shared/services/game.service'
import { Subscription } from 'rxjs'

@Component({
    selector: 'app-home',
    standalone: true,
    imports: [CommonModule, GameCardComponent],
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
    private gameService = inject(GameService)
    private router = inject(Router)

    allGames: Game[] = []
    displayedGames: Game[] = []
    activeFilter: 'all' | 'popular' | 'downloaded' | 'upcoming' | 'add' = 'all'

    private gamesSubscription: Subscription | null = null

    constructor() {}

    ngOnInit(): void {
        this.gamesSubscription = this.gameService.games$.subscribe((games) => {
            console.log('Juegos recibidos del servicio:', games)
            this.allGames = games

            if (this.activeFilter === 'all') {
                this.showAllGames()
            } else {
                this.applyCurrentFilter()
            }
        })
    }

    ngOnDestroy(): void {
        this.gamesSubscription?.unsubscribe()
    }

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
                break
            default:
                this.showAllGames()
        }
    }

    showAllGames(): void {
        this.displayedGames = [...this.allGames].sort((a, b) =>
            a.title.localeCompare(b.title)
        )
        this.activeFilter = 'all'
        console.log('Mostrando todos los juegos (ordenados por título)')
    }

    filterPopular(): void {
        this.displayedGames = this.allGames
            .filter((game) => game.rating > 4)
            .sort((a, b) => b.rating - a.rating)
        this.activeFilter = 'popular'
        console.log('Filtrando por populares (rating > 4, orden descendente)')
    }

    filterDownloaded(): void {
        this.displayedGames = this.allGames
            .filter((game) => (game.downloads ?? 0) > 100)
            .sort((a, b) => (b.downloads ?? 0) - (a.downloads ?? 0))
        this.activeFilter = 'downloaded'
        console.log('Filtrando por más descargados (downloads > 100, orden descendente)')
    }

    filterUpcoming(): void {
        this.displayedGames = this.allGames
            .filter((game) => game.comingSoon === true)
            .sort((a, b) => a.releaseDate.localeCompare(b.releaseDate))
        this.activeFilter = 'upcoming'
        console.log('Filtrando por próximamente (comingSoon = true, ordenado por fecha)')
    }

    navigateToAdd(): void {
        this.router.navigate(['/add-game'])
    }

    logout(): void {
        console.log('Cerrando sesión...')
        this.router.navigate(['/login'])
    }

    trackByGameId(index: number, game: Game): string | number {
        return game.id ?? game.title
    }
}
