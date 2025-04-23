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
