import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { LoginComponent } from './components/login/login.component' // Asegúrate que la ruta sea correcta
import { AuthRoutingModule } from './auth-routing.module' // Importa el routing del módulo
import { RegisterComponent } from './components/register/register.component'

@NgModule({
    declarations: [],
    imports: [CommonModule, AuthRoutingModule, LoginComponent, RegisterComponent]
})
export class AuthModule {}
