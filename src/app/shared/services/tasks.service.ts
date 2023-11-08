import { Injectable } from '@angular/core'
import { Subscription } from 'rxjs'
import { Task } from '../interfaces'

@Injectable({
  providedIn: 'root'
})
export class TasksService {


  getTasksData() {
    return [
      {
        name: 'Выгулять пса',
        complete: false,
        expiresIn: new Date(),
        category: "string",
      },
      {
        name: 'Выгулять пса 2',
        complete: false,
        category: "string",
      },
      {
        name: 'Выгулять кота',
        complete: false,
        category: "string",
      },
      {
        name: 'Выгулять кота',
        complete: false
      }
    ]
  }
}
