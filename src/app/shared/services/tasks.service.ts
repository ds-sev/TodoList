import { inject, Injectable, signal, WritableSignal } from '@angular/core'
import { ICategory, ITask } from '../interfaces'
import { AuthService } from './auth.service'

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  tasksListSig: WritableSignal<ITask[]> = signal<ITask[]>([])
  // filteredTasksSig = computed(() => this.tasksListSig)

  authService = inject(AuthService)

  getStoredUserData() {
    const currentUserId: string | null = localStorage.getItem('authorized')
    const currentUserData = currentUserId ? localStorage.getItem(currentUserId) : null
    return currentUserData ? JSON.parse(currentUserData) : null
  }

  getTasksData() {
    const userData = this.getStoredUserData()
    this.tasksListSig.set(userData.tasks)
  }

  getTasksDataByCategoryId(categoryId: string) {
    // this.getTasksData()
    this.tasksListSig.update(taskArr => taskArr.filter(task => task.category && task.category.id === categoryId))

  }

  updateTasksView(currentCategory: ICategory | null) {
    // localStorage.setItem('tasks', JSON.stringify(this.tasksListSig()))
    if (currentCategory) {
      this.getTasksData()
      this.getTasksDataByCategoryId(currentCategory.id)
    } else {
      this.getTasksData()
    }
  }

  getStoredTasks() {
    const storedTasks = localStorage.getItem('tasks')
    if (storedTasks) {
      return JSON.parse(storedTasks)
    }
  }

  addTask(newTaskData: any, currentCategory: ICategory | null) {
    const newTask: ITask = {
      id: Math.random().toString(16),
      name: newTaskData.name.charAt(0).toUpperCase() + newTaskData.name.slice(1),
      complete: false,
      created: new Date().toLocaleDateString(),
      expiresIn: newTaskData.expiresIn,
      priority: newTaskData.priority,
      category: newTaskData.category || null
    }

    const userData = this.getStoredUserData()
    const currentUserId = this.authService.getCurrentUserId()

    if (currentUserId) {
      userData.tasks.unshift(newTask)
      localStorage.setItem(currentUserId, JSON.stringify(userData))
    }
    this.updateTasksView(currentCategory)
  }

  toggleTaskStatus(taskToChangeStatus: ITask) {

    let userData = this.getStoredTasks()
    userData.data.map((task: { id: string }) => task.id === taskToChangeStatus.id ? {
      ...task, complete: !!taskToChangeStatus.complete
    } : task)

    // localStorage.setItem('tasks', JSON.stringify(storedTasks))

    const currentUserId = this.authService.getCurrentUserId()
    if (currentUserId) {
      localStorage.setItem(currentUserId, JSON.stringify(userData))
    }
  }

  editTask(taskId: string, taskEditedData: any, currentCategory: ICategory | null) {
    let storedTasks = this.getStoredTasks()
    storedTasks = storedTasks.map((task: { id: string }) => task.id === taskId ? {
      ...task,
      id: task.id,
      name: taskEditedData.name,
      complete: taskEditedData.complete || false,
      expiresIn: taskEditedData.expiresIn,
      priority: taskEditedData.priority,
      category: taskEditedData.category
    } : task)
    localStorage.setItem('tasks', JSON.stringify(storedTasks))
    this.updateTasksView(currentCategory)
  }

  deleteTask(id: string, currentCategory: ICategory | null) {
    let storedTasks = this.getStoredTasks()
    storedTasks = storedTasks.filter((task: ITask) => task.id !== id)
    localStorage.setItem('tasks', JSON.stringify(storedTasks))

    this.updateTasksView(currentCategory)

    // this.tasksListSig.update(tasks => tasks.filter((task) => task.id !== id))
    // this.updateStoredTasks()
  }
}

//TODO: create task for current opened category
//TODO:
//TODO:
//TODO:
//TODO:
