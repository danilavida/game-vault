// src/app/shared/models/game.model.ts

export interface Game {
    id?: string | number
    title: string
    description: string
    releaseDate: string // Considerar usar Date type
    image: string
    rating: number
    downloads?: number
    comingSoon?: boolean
    price?: number
    genres?: string[]
    platforms?: string[]
}
