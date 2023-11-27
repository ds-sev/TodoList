import { inject, Injectable } from '@angular/core'
import { IUser } from '../interfaces'
import { MessageService } from 'primeng/api'
import { UserService } from './user.service'
import { Subject } from 'rxjs'

@Injectable({
  providedIn: 'root',
})

export class AuthService {

  messageService = inject(MessageService)
  userService = inject(UserService)

  registerSuccess$ = new Subject<boolean>()

  register(user: IUser) {
    const storedData = this.userService.getStoredData(user)
    if (storedData) {
      this.messageService.add({
        severity: 'error',
        summary: 'Ошибка',
        detail: 'Пользователь с таким email уже существует',
        key: 'notificationToast'
      })
      this.registerSuccess$.next(false)
    } else {
      const newUserData: IUser = {...user, tasks: [], categories: []}
      localStorage.setItem(`user_${user.email}`, JSON.stringify(newUserData))
      this.messageService.add({
        severity: 'success',
        summary: 'Ok',
        detail: 'Успешная регистрация',
        key: 'notificationToast'
      })
      this.registerSuccess$.next(true)
    }
  }

  login(user: IUser) {
    const storedData = this.userService.getStoredData(user)
    // const userDataString = localStorage.getItem(`user_${user.email}`)
    // const userToAuth: IUser = userDataString ? JSON.parse(userDataString) : null
    if (storedData && storedData.email === user.email && storedData.password === user.password) {
      localStorage.setItem('authorized', `user_${user.email}`)
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

  getCurrentUserId(): string | null {
    return localStorage.getItem('authorized')
  }

  logout() {
    localStorage.removeItem('authorized')
  }
}
