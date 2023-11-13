import { Injectable } from '@angular/core'
import { IUser } from '../interfaces'
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root'
})

export class AuthService {


  register(user: IUser) {
    localStorage.setItem('user', JSON.stringify(user))
  }

  login(user: IUser) {
    if (localStorage.getItem('user') === JSON.stringify(user) ) {
      console.log('Logged In!')
      localStorage.setItem('authorized', 'yes')
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
