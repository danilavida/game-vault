import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { LoginComponent } from './components/login/login.component' 
import { AuthRoutingModule } from './auth-routing.module'
import { RegisterComponent } from './components/register/register.component'

@NgModule({
    declarations: [],
    imports: [CommonModule, AuthRoutingModule, LoginComponent, RegisterComponent]
})
export class AuthModule {}
