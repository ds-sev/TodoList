import { Injectable } from '@angular/core'
import { Subscription } from 'rxjs'
import { Task } from '../interfaces'

@Injectable({
  providedIn: 'root'
})
export class TasksService {


  getTasksData() {
    return JSON.parse(localStorage.getItem('tasks'))
  }

  addTask(newTaskData: Task) {
    const stored = this.getTasksData()
    if (stored) {
      console.log(stored)
      stored.push(newTaskData)
      return localStorage.setItem('tasks', JSON.stringify(stored))
    } else {
      return localStorage.setItem('tasks', JSON.stringify([newTaskData]))
    }
  }
}
