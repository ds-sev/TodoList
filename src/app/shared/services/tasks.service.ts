import { Injectable } from '@angular/core'
import { Observable, of, Subscription } from 'rxjs'
import { Task } from '../interfaces'

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  storedTasks: Task[]

  constructor() {
  }


  getTasksData(): Observable<Task[]> {
    return of(JSON.parse(localStorage.getItem('tasks')))
  }

  addTask(newTaskData: Task) {
    this.getTasksData().subscribe(tasks => this.storedTasks = tasks)
    if (this.storedTasks) {
      this.storedTasks.push(newTaskData)
      localStorage.setItem('tasks', JSON.stringify(this.storedTasks))
    } else {
      localStorage.setItem('tasks', JSON.stringify([newTaskData]))
    }
  }
}
