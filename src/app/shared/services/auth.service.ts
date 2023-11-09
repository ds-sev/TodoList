import { Injectable } from '@angular/core'
import { User } from '../interfaces'
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  isAuthenticated() : boolean {
    return false
  }

  register(user: User) {
    localStorage.setItem('user', JSON.stringify(user))

  }
}
