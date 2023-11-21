import { inject, Injectable } from '@angular/core'
import { IUser } from '../interfaces'
import { MessageService } from 'primeng/api'

@Injectable({
  providedIn: 'root',
})

export class AuthService {

  messageService = inject(MessageService)

  register(user: IUser) {
    localStorage.setItem('user', JSON.stringify(user))
  }

  login(user: IUser) {
    if (localStorage.getItem('user') === JSON.stringify(user) ) {
      localStorage.setItem('authorized', 'yes')
      this.messageService.add({
        severity:'success',
        summary:'Ok',
        detail:'Успешный вход',
        key: 'notificationToast'
      });
    } else {
      this.messageService.add({
        severity:'error',
        summary:'Ошибка',
        detail:'Проверьте правильность ввода логина или пароля',
        key: 'notificationToast'
      });
    }
  }

  isAuthenticated() : boolean {
    if (localStorage.getItem('authorized')) {
      return true
    } else {
      return false
    }
  }

  logout() {
    localStorage.removeItem('authorized')
  }
}
