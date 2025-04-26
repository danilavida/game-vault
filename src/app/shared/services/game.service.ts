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
            title: 'The legend of Zelda: Tears of the Kingdom',
            description:
                'Es un videojuego de acción y aventura desarrollado por Nintendo...',
            releaseDate: '12/mayo/2023',
            image: 'https://assets.nintendo.com/image/upload/ar_16:9,c_lpad,w_1240/b_white/f_auto/q_auto/ncom/software/switch/70010000063714/956c12eb1a4c9e68b494cca7efd23d20ba8a789a5eb02589affae64bc6bc3282',
            rating: 5,
            downloads: 15000,
            comingSoon: false
        },
        {
            title: 'Aventura Espacial X',
            description:
                'Starfield es el primer universo nuevo en más de 25 años de Bethesda Game Studios. En este juego de rol de nueva generación ambientado entre las estrellas, crea el personaje que desees y explora con una libertad sin precedentes mientras te embarcas en un viaje épico para responder al mayor misterio de la humanidad.',
            releaseDate: '6 de septiembre de 2023',
            image: 'https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1716740/header.jpg',
            rating: 4.9,
            downloads: 8500,
            comingSoon: true
        },
        {
            id: 'game-3',
            title: "Baldur's Gate 3",
            description:
                'Reúne a tu grupo y regresa a los Reinos Olvidados en una historia de compañerismo y traición, sacrificio y supervivencia, y la atracción del poder absoluto. Un RPG de nueva generación de los creadores de Divinity: Original Sin 2, ambientado en el mundo de Dungeons & Dragons.',
            releaseDate: '3 de agosto de 2023',
            image: 'https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1086940/header.jpg?t=1734112230',
            rating: 4.8,
            downloads: 0,
            comingSoon: true
        },
        {
            id: 'game-4',
            title: 'Need for Speed Unbound',
            description:
                'Compite contra el tiempo, sé más astuto que la policía y participa en clasificatorios semanales para llegar a The Grand, el desafío de carreras callejeras definitivo de Lakeshore. Llena tu garaje con vehículos personalizados y tuneados con precisión e ilumina las calles con tu estilo, presentando un estilo visual único que mezcla arte callejero con coches realistas.',
            releaseDate: '2 de diciembre de 2022',
            image: 'https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1846380/header.jpg?t=1734112230',
            rating: 4.7,
            downloads: 11200,
            comingSoon: false
        },
        {
            id: 'game-5',
            title: 'Cocoon',
            description:
                'Del diseñador principal de jugabilidad de LIMBO e INSIDE, Cocoon es una versión única del género de aventuras y puzzles, donde cada mundo existe dentro de un orbe que puedes llevar a la espalda. Domina las mecánicas de salto entre mundos para desentrañar un misterio cósmico.',
            releaseDate: '29 de septiembre de 2023',
            image: 'https://image.api.playstation.com/vulcan/ap/rnd/202308/0320/cbfca01d60096c201fa98b544c26d3f2a522ec4a6c1fa6c5.png',
            rating: 4.6,
            downloads: 25000,
            comingSoon: false
        },
        {
            id: 'game-6',
            title: 'Stardew Valley',
            description:
                'Has heredado la vieja granja de tu abuelo en Stardew Valley. Armado con herramientas de segunda mano y unas pocas monedas, te dispones a empezar tu nueva vida. Convierte campos descuidados en una granja animada, cría animales, cultiva cosechas, explora cuevas y forma parte de la comunidad local.',
            releaseDate: '26 de febrero de 2016',
            image: 'https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/413150/header.jpg?t=1711128146',
            rating: 3,
            downloads: 9800,
            comingSoon: true
        },
        {
            id: 'game-7',
            title: 'Celeste',
            description:
                'Ayuda a Madeline a sobrevivir a sus demonios internos en su viaje a la cima de la Montaña Celeste en este juego de plataformas súper preciso y hecho a mano por los creadores de TowerFall. Supera cientos de desafíos, descubre secretos retorcidos y reconstruye el misterio de la montaña.',
            releaseDate: '25 de enero de 2018',
            image: 'https://cdn.akamai.steamstatic.com/steam/apps/504230/header.jpg?t=1714089525',
            rating: 2,
            downloads: 13,
            comingSoon: false
        },
        {
            id: 'game-8',
            title: 'Alan Wake 2',
            description:
                'Una serie de asesinatos rituales amenaza Bright Falls. Saga Anderson, una consumada perfiladora del FBI, llega para investigar. Mientras tanto, Alan Wake, un escritor atrapado en una pesadilla más allá de nuestro mundo, escribe una oscura historia para moldear la realidad. Conectados a través de dimensiones, deben usar la luz como arma para sobrevivir.',
            releaseDate: '27 de octubre de 2023',
            image: 'https://image.api.playstation.com/vulcan/ap/rnd/202309/0818/338f2c722e938098763a27ead4a182c3cc3f8741e709279a.png',
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
