import { Routes } from '@angular/router'
import { LoginComponent } from './features/auth/components/login/login.component'
import { RegisterComponent } from './features/auth/components/register/register.component'
import { HomeComponent } from './features/home/components/home/home.component'

export const routes: Routes = [
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'register',
        component: RegisterComponent
    },
    {
        path: 'add-game',
        loadComponent: () =>
            import('./features/games/components/add-game/add-game.component').then(
                (c) => c.AddGameComponent
            )
        // Puedes añadir Guards aquí también si solo usuarios logueados pueden agregar
    },
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    },
    {
        path: 'home',
        component: HomeComponent
    },
    {
        path: '**',
        redirectTo: 'login',
        pathMatch: 'full'
    }
]
