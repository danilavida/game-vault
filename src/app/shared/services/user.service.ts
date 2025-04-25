import { Injectable } from '@angular/core'

export interface User {
    id: number | string
    username: string
    email: string
}

@Injectable({
    providedIn: 'root'
})
export class UserService {
    private users: User[] = [
        { id: 1, username: 'AdminUser', email: 'admin@gamevault.com' }
    ]

    constructor() {}
}
