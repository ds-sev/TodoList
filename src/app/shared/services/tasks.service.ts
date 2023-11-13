import { Injectable, signal, WritableSignal } from '@angular/core'
import { ITask } from '../interfaces'

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  tasksListSig: WritableSignal<ITask[]> = signal<ITask[]>([])

  getTasksData() {
    this.tasksListSig.set(JSON.parse(localStorage.getItem('tasks')))
  }

  updateStorageTasks() {
    localStorage.setItem('tasks', JSON.stringify(this.tasksListSig()))
  }

  addTask(newTaskData: ITask) {
    const newTask: ITask = {
      id: Math.random().toString(16),
      name: newTaskData.name,
      complete: false,
      expiresIn: newTaskData.expiresIn
    }

    if (this.tasksListSig()) {
      this.tasksListSig.update(v => [...v, newTask])
      this.updateStorageTasks()

    } else {
      localStorage.setItem('tasks', JSON.stringify([newTask]))
    }
  }

  deleteTask(id: string) {
    this.tasksListSig.update(tasks => tasks.filter((task) => task.id !== id))
    this.updateStorageTasks()
  }
}
