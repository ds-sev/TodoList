import { Injectable } from '@angular/core'
import { IUser } from '../interfaces'

@Injectable({
  providedIn: 'root'
})

export class UserService {

  // currentUserId : string | null = null
  // private currentUser: IUser | null = null


  // setCurrentUser(email: string) {
  //   localStorage.setItem('authorized', `user_${email}`)
  // }

  getStoredData(user: IUser): IUser {
    const storedData = localStorage.getItem(`user_${user.email}`)
    return storedData ? JSON.parse(storedData) : null
  }

  // clearCurrentUser() {
  //   this.currentUser = null
  // }
}
