import { inject, Injectable } from '@angular/core'
import { IUser } from '../interfaces'
import { MessageService } from 'primeng/api'

@Injectable({
  providedIn: 'root',
})

export class AuthService {

  messageService = inject(MessageService)

  register(user: IUser) {
    // localStorage.setItem('user', JSON.stringify(user))
    const newUserData: IUser = {...user, data: [{id: 'lk', name: 'test'}]}
    localStorage.setItem(`user_${user.email}`, JSON.stringify(newUserData))
    // localStorage.setItem(`user_${user.email}`, JSON.stringify(user))
  }

  login(user: IUser) {


    const userDataString = localStorage.getItem(`user_${user.email}`);
    const userToAuth: IUser = userDataString ? JSON.parse(userDataString) : null;

    console.log(userToAuth.email, userToAuth.password)

    if (userToAuth.email === user.email && userToAuth.password === user.password) {



    // if (localStorage.getItem(`user_${user.email}`) === JSON.stringify(user)) {
      localStorage.setItem('authorized', 'yes')
      this.messageService.add({
        severity: 'success',
        summary: 'Ok',
        detail: 'Успешный вход',
        key: 'notificationToast'
      })
    } else {
      this.messageService.add({
        severity: 'error',
        summary: 'Ошибка',
        detail: 'Проверьте правильность ввода логина или пароля',
        key: 'notificationToast'
      })
    }
  }

  isAuthenticated(): boolean {
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
