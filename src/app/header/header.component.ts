import { Component, inject } from '@angular/core'
import { CommonModule } from '@angular/common'
import { CategoriesComponent } from '../content-page/categories/categories.component'
import { ButtonModule } from 'primeng/button'
import { AuthService } from '../shared/services/auth.service'
import { Router } from '@angular/router'
import { ConfirmationService, MessageService } from 'primeng/api'
import { ConfirmPopupModule } from 'primeng/confirmpopup'

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, CategoriesComponent, ButtonModule, ConfirmPopupModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {

  confirmationService = inject(ConfirmationService)
  messageService = inject(MessageService)

  constructor(public authService: AuthService, private router: Router) {
  }

  confirmLogOut(event) {
    this.confirmationService.confirm({
      target: event.target,
      message: `Выйти из системы?`,
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Да',
      rejectLabel: 'Отмена',
      accept: () => {
        this.messageService.add({
          severity: 'info',
          summary: 'Вы успешно вышли',
          key: 'notificationToast'
        })
        this.authService.logout()
        this.router.navigate(['/login'])
      }
    })
  }
}
