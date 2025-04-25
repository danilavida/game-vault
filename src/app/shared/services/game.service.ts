import { Injectable } from '@angular/core'
import { BehaviorSubject, Observable, of } from 'rxjs'
import { Game } from '../models/game.model'

@Injectable({
    providedIn: 'root'
})
export class GameService {
    private gamesSubject = new BehaviorSubject<Game[]>([
        {
            id: 'game-1',
            title: 'The Soccer 2024',
            description: 'Es un videojuego de fútbol...',
            releaseDate: '29/octubre/2024',
            image: 'https://placehold.co/600x400/001f3f/FFF?text=Game+Image+1',
            rating: 5,
            downloads: 15000,
            comingSoon: false
        },
        {
            id: 'game-2',
            title: 'Aventura Espacial X',
            description: 'Explora galaxias desconocidas...',
            releaseDate: '15/mayo/2024',
            image: 'https://placehold.co/600x400/17a2b8/FFF?text=Game+Image+2',
            rating: 4.9,
            downloads: 8500,
            comingSoon: true
        },
        {
            id: 'game-3',
            title: 'Mundo de Fantasía RPG',
            description: 'Sumérgete en un vasto mundo...',
            releaseDate: '01/enero/2025',
            image: 'https://placehold.co/600x400/ffc107/000?text=Game+Image+3',
            rating: 4.8,
            downloads: 0,
            comingSoon: true
        },
        {
            id: 'game-4',
            title: 'Carreras Urbanas Nitro',
            description: 'Compite en carreras callejeras...',
            releaseDate: '10/marzo/2024',
            image: 'https://placehold.co/600x400/dc3545/FFF?text=Game+Image+4',
            rating: 4.7,
            downloads: 11200,
            comingSoon: false
        },
        {
            id: 'game-5',
            title: 'Puzzle Quest Deluxe',
            description: 'Resuelve cientos de ingeniosos puzzles...',
            releaseDate: '05/febrero/2024',
            image: 'https://placehold.co/600x400/28a745/FFF?text=Game+Image+5',
            rating: 4.6,
            downloads: 25000,
            comingSoon: false
        },
        {
            id: 'game-6',
            title: 'Simulador de Granja Feliz',
            description: 'Cultiva tus propios vegetales...',
            releaseDate: '20/abril/2024',
            image: 'https://placehold.co/600x400/6c757d/FFF?text=Game+Image+6',
            rating: 3,
            downloads: 9800,
            comingSoon: true
        },
        {
            id: 'game-7',
            title: 'Plataformas Pixeladas',
            description: 'Un clásico juego de plataformas...',
            releaseDate: '01/junio/2024',
            image: 'https://placehold.co/600x400/001f3f/FFF?text=Game+Image+7',
            rating: 2,
            downloads: 13,
            comingSoon: false
        },
        {
            id: 'game-8',
            title: 'Horror Cósmico: El Despertar',
            description: 'Investiga extraños sucesos...',
            releaseDate: '31/octubre/2024',
            image: 'https://placehold.co/600x400/343a40/FFF?text=Game+Image+8',
            rating: 1.5,
            downloads: 50,
            comingSoon: false
        }
    ])

    games$: Observable<Game[]> = this.gamesSubject.asObservable()

    private nextId = 9

    constructor() {}

    private getCurrentGames(): Game[] {
        return this.gamesSubject.getValue()
    }

    addGame(gameData: Omit<Game, 'id'>): void {
        const currentGames = this.getCurrentGames()
        const newGame: Game = {
            ...gameData,
            id: `game-${this.nextId++}`
        }

        this.gamesSubject.next([...currentGames, newGame])
        console.log('Juego agregado:', newGame)
        console.log('Lista actual:', this.getCurrentGames())
    }

    getGameById(id: string | number): Observable<Game | undefined> {
        const game = this.getCurrentGames().find((g) => g.id === id)
        return of(game)
    }
}
