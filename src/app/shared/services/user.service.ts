import { Injectable } from '@angular/core'
import { IUser } from '../interfaces'

@Injectable({
  providedIn: 'root'
})

export class UserService {

  getCurrentUserId(): string | null {
    return localStorage.getItem('authorized')
  }

  getStoredData(user: IUser): IUser {
    const storedData = localStorage.getItem(`user_${user.email}`)
    return storedData ? JSON.parse(storedData) : null
  }

  getStoredCurrentUserData(): IUser {
    const currentUserId: string | null = localStorage.getItem('authorized')
    const currentUserData = currentUserId ? localStorage.getItem(currentUserId) : null
    return currentUserData ? JSON.parse(currentUserData) : null
  }
}
