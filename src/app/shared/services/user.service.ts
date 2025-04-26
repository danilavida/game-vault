// src/app/shared/services/user.service.ts
import { Injectable } from '@angular/core'
import { BehaviorSubject, Observable, of, throwError } from 'rxjs' // Importa más de RxJS

// 1. Añadir campo 'password'
export interface User {
    id: number | string // Mantengamos la flexibilidad por ahora, usaremos number internamente
    username: string
    email: string
    password?: string // La contraseña es crucial
}

@Injectable({
    providedIn: 'root'
})
export class UserService {
    // Usuarios iniciales (con contraseña)
    private users: User[] = [
        {
            id: 1,
            username: 'AdminUser',
            email: 'admin@gamevault.com',
            password: 'password123'
        },
        {
            id: 2,
            username: 'TestUser',
            email: 'test@example.com',
            password: 'testpassword'
        } // Otro usuario de ejemplo
    ]
    private nextId = 3 // Siguiente ID a asignar

    // 4. BehaviorSubject para manejar el estado del usuario actual
    private currentUserSubject = new BehaviorSubject<User | null>(null)
    public currentUser$: Observable<User | null> = this.currentUserSubject.asObservable()

    constructor() {}

    /** Obtiene el valor actual del usuario logueado (síncrono) */
    public get currentUserValue(): User | null {
        return this.currentUserSubject.value
    }

    /** Verifica si hay un usuario logueado */
    public isLoggedIn(): boolean {
        return !!this.currentUserValue // True si currentUserValue no es null
    }

    // 2. Registro de Usuario
    /**
     * Registra un nuevo usuario si el email y username no existen.
     * @param userData Datos del usuario (sin id).
     * @returns Observable con el usuario creado o un objeto de error.
     */
    registerUser(userData: Omit<User, 'id'>): Observable<User | { error: string }> {
        // Verifica si el email o username ya existen
        const existingUser = this.users.find(
            (u) => u.email === userData.email || u.username === userData.username
        )

        if (existingUser) {
            let errorMessage = ''
            if (existingUser.email === userData.email) {
                errorMessage = 'El correo electrónico ya está registrado.'
            } else {
                errorMessage = 'El nombre de usuario ya existe.'
            }
            console.error('Error de registro:', errorMessage)
            return of({ error: errorMessage }) // Retorna un observable con el error
        }

        // Crea el nuevo usuario con un ID único
        const newUser: User = {
            ...userData,
            id: this.nextId++
        }

        // Añade el usuario a la lista (en memoria)
        this.users.push(newUser)
        console.log('Usuario registrado:', newUser)
        console.log('Lista de usuarios actualizada:', this.users)

        // Retorna el nuevo usuario como observable
        return of(newUser)
    }

    // 3. Búsqueda de Usuarios
    /**
     * Busca un usuario por su correo electrónico.
     * @param email Email a buscar.
     * @returns Observable con el usuario encontrado o undefined.
     */
    findUserByEmail(email: string): Observable<User | undefined> {
        const user = this.users.find((u) => u.email === email)
        return of(user)
    }

    /**
     * Busca un usuario por su nombre de usuario.
     * @param username Username a buscar.
     * @returns Observable con el usuario encontrado o undefined.
     */
    findUserByUsername(username: string): Observable<User | undefined> {
        const user = this.users.find((u) => u.username === username)
        return of(user)
    }

    // 4. Simulación de Login/Logout
    /**
     * Intenta iniciar sesión con email y contraseña.
     * Actualiza el currentUserSubject si es exitoso.
     * @param email
     * @param password
     * @returns Observable con el usuario logueado o un objeto de error.
     */
    login(email: string, password: string): Observable<User | { error: string }> {
        const user = this.users.find((u) => u.email === email)

        if (user && user.password === password) {
            // ¡Login exitoso! (Simulado)
            console.log('Login exitoso para:', user.username)
            // Eliminar la contraseña antes de almacenarla en el BehaviorSubject por seguridad
            const userWithoutPassword = { ...user }
            delete userWithoutPassword.password
            this.currentUserSubject.next(userWithoutPassword) // Notifica a los suscriptores
            return of(userWithoutPassword)
        } else {
            // Error de login
            console.error('Error de login: Email o contraseña inválidos')
            this.currentUserSubject.next(null) // Asegura que no haya usuario logueado
            return of({ error: 'Correo electrónico o contraseña inválidos.' })
        }
    }

    /**
     * Cierra la sesión del usuario actual.
     */
    logout(): void {
        console.log('Cerrando sesión...')
        this.currentUserSubject.next(null) // Establece el usuario actual a null
    }

    // Método adicional para obtener todos los usuarios (para debug o admin)
    getAllUsers(): Observable<User[]> {
        // Devolver copia sin contraseñas
        const usersWithoutPasswords = this.users.map((u) => {
            const userCopy = { ...u }
            delete userCopy.password
            return userCopy
        })
        return of(usersWithoutPasswords)
    }
}
