import { Injectable, signal, WritableSignal } from '@angular/core'
import { ITask } from '../interfaces'

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  tasksListSig: WritableSignal<ITask[]> = signal<ITask[]>([])
  filteredTasksSig: WritableSignal<ITask[]> = signal<ITask[]>([])

  getTasksData() {
    this.tasksListSig.set(JSON.parse(localStorage.getItem('tasks')))
  }

  getTasksDataByCategoryId(categoryId: string) {
    // this.getTasksData()
    this.tasksListSig.update(taskArr => taskArr.filter(task => task.category && task.category.id === categoryId))
  }

  updateStoredTasks() {
    localStorage.setItem('tasks', JSON.stringify(this.tasksListSig()))
  }

  getStoredTasks() {
    return JSON.parse(localStorage.getItem('tasks'))
  }

  addTask(newTaskData: ITask) {
    const newTask: ITask = {
      id: Math.random().toString(16),
      name: newTaskData.name.charAt(0).toUpperCase() + newTaskData.name.slice(1),
      complete: false,
      expiresIn: newTaskData.expiresIn,
      priority: newTaskData.priority,
      category: newTaskData.category || null
    }

    if (this.tasksListSig()) {
      this.tasksListSig.update(v => [...v, newTask])
      this.updateStoredTasks()

    } else {
      localStorage.setItem('tasks', JSON.stringify([newTask]))
    }
  }

  deleteTask(id: string) {
    this.tasksListSig.update(tasks => tasks.filter((task) => task.id !== id))
    this.updateStoredTasks()
  }

  editTask(taskId: string, taskEditedData: ITask) {


    let storedTasks = this.getStoredTasks()

    console.log(taskId, taskEditedData.name)
    storedTasks = storedTasks.map((task: { id: string }) => task.id === taskId ? {
      id: task.id,
      name: taskEditedData.name,
      complete: taskEditedData.complete || false,
      expiresIn: taskEditedData.expiresIn,
      priority: taskEditedData.priority,
      category: taskEditedData.category
    } : task)

    localStorage.setItem('tasks', JSON.stringify(storedTasks))
    this.getTasksData()

    // this.tasksListSig.update(taskArr => taskArr.map(task => task.id === taskId ? {
    //     id: task.id,
    //     name: taskEditedData.name,
    //     complete: taskEditedData.complete || false,
    //     expiresIn: taskEditedData.expiresIn,
    //     priority: taskEditedData.priority,
    //     category: taskEditedData.category
    //   } : task)
    // )
    // this.updateStorageTasks()
  }

  toggleTaskStatus(taskToChangeStatus: ITask) {
    let storedTasks = this.getStoredTasks()
    storedTasks = storedTasks.map((task: { id: string }) => task.id === taskToChangeStatus.id ? {
      ...task, complete: !!taskToChangeStatus.complete
    } : task)
    localStorage.setItem('tasks', JSON.stringify(storedTasks))
  }
}
