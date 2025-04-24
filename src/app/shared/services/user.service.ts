// src/app/shared/services/user.service.ts
import { Injectable } from '@angular/core'

// Define una interfaz simple para el usuario si aún no la tienes
export interface User {
    id: number | string
    username: string
    email: string
    // Agrega otras propiedades si son necesarias
}

@Injectable({
    providedIn: 'root' // Servicio disponible en toda la aplicación
})
export class UserService {
    // Por ahora, podemos simular una lista simple o dejarlo vacío
    private users: User[] = [
        // Puedes añadir usuarios de ejemplo si lo necesitas para pruebas
        { id: 1, username: 'AdminUser', email: 'admin@gamevault.com' }
    ]

    constructor() {}

    // Métodos futuros (ejemplos):
    // getUsers(): User[] { return this.users; }
    // getUserById(id: number | string): User | undefined { ... }
    // addUser(user: User): void { ... }
    // isLoggedIn(): boolean { return true; } // Simulación simple
    // getCurrentUser(): User | null { return this.users[0] ?? null; } // Simulación
}
