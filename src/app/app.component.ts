import {Component} from '@angular/core'
import {ToastModule} from 'primeng/toast'
import {MessageService} from 'primeng/api'
import {AuthService} from './shared/services/auth.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [ToastModule, MessageService, AuthService]
})
export class AppComponent {
}
