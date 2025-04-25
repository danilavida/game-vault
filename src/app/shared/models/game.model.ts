export interface Game {
    id?: string | number
    title: string
    description: string
    releaseDate: string
    image: string
    rating: number
    downloads?: number
    comingSoon?: boolean
    price?: number
    genres?: string[]
    platforms?: string[]
}
