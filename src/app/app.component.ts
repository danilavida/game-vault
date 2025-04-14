import { Component } from '@angular/core'
import { RouterOutlet } from '@angular/router'
import { LoginComponent } from './features/auth/components/login/login.component'
import { RegisterComponent } from './features/auth/components/register/register.component'

@Component({
    selector: 'app-root',
    imports: [RouterOutlet, LoginComponent, RegisterComponent],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})
export class AppComponent {
    title = 'game-vault'
}
