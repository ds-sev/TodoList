import { Component, inject } from '@angular/core'
import { CommonModule } from '@angular/common'
import { Router } from '@angular/router'
import { ConfirmationService, MessageService } from 'primeng/api'
import { ConfirmPopupModule } from 'primeng/confirmpopup'

import { AuthService } from '../shared/services/auth.service'
import { UserService } from '../shared/services/user.service'

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, ConfirmPopupModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {

  confirmationService = inject(ConfirmationService)
  messageService = inject(MessageService)

  constructor(public authService: AuthService, public userService: UserService, private router: Router) {
  }

  confirmLogOut(event: any) {
    this.confirmationService.confirm({
      target: event.target,
      message: `Выйти из системы?`,
      icon: 'pi pi-question-circle',
      acceptLabel: 'Да',
      rejectLabel: 'Отмена',
      accept: () => {
        this.messageService.add({
          severity: 'info',
          summary: 'Вы успешно вышли',
          key: 'notificationToast'
        })
        this.authService.logout()
        this.router.navigate(['/login']).then()
      }
    })
  }

  protected readonly window = window
}
