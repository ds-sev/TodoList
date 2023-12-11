import { Injectable } from '@angular/core';
import { IUser } from '../interfaces';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class UserService {

  getCurrentUserId(): string | null {
    return localStorage.getItem('authorized');
  }

  getStoredData(user: IUser): Observable<IUser | null> {
    return new Observable<IUser | null>(observer => {
      const storedData = localStorage.getItem(`user_${user.email}`);
      if (storedData) {
        observer.next(JSON.parse(storedData));
      } else {
        observer.next(null);
      }
    });
  }

  getStoredCurrentUserData(): IUser {
    const currentUserId: string | null = localStorage.getItem('authorized');
    const currentUserData = currentUserId ? localStorage.getItem(currentUserId) : null;
    return currentUserData ? JSON.parse(currentUserData) : null;
  }
}
