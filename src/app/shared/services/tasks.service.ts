import { Injectable } from '@angular/core'

@Injectable()
export class TasksService {
  getTasksData() {
    return [
      {
        name: 'Выгулять пса',
        complete: false,
        expiresIn: Date,
        category: "string",
      },
      {
        name: 'Выгулять пса 2',
        complete: false,
        expiresIn: Date,
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
