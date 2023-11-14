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
      expiresIn: newTaskData.expiresIn,
      priority: newTaskData.priority
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

  editTask(taskId: string, taskEditedData: ITask) {
    this.tasksListSig.update(taskArr => taskArr.map(task => task.id === taskId ? {
        id: task.id,
        name: taskEditedData.name,
        complete: taskEditedData.complete || false,
        expiresIn: taskEditedData.expiresIn,
        priority: taskEditedData.priority
      } : task)
    )
    this.updateStorageTasks()
  }
}
