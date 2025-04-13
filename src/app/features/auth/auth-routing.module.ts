import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { LoginComponent } from './components/login/login.component'

const routes: Routes = [
    { path: 'login', component: LoginComponent }
    // Puedes añadir una ruta por defecto para el módulo auth si quieres
    // { path: '', redirectTo: 'login', pathMatch: 'full' }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AuthRoutingModule {}
