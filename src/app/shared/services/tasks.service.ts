import { Injectable } from '@angular/core'
import { Observable, of, } from 'rxjs'
import { Task } from '../interfaces'

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  private storedTasks: Task[]

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

  deleteTask(index: number) {
    this.getTasksData().subscribe(tasks => this.storedTasks = tasks)
    this.storedTasks.splice(index, 1)
    localStorage.setItem('tasks', JSON.stringify(this.storedTasks))
  }
}
