import { inject, Injectable, signal, WritableSignal } from '@angular/core'
import { ICategory, ITask, IUser } from '../interfaces'
import { AuthService } from './auth.service'
import { UserService } from './user.service'

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  tasksListSig: WritableSignal<ITask[]> = signal<ITask[]>([])
  // filteredTasksSig = computed(() => this.tasksListSig)

  authService = inject(AuthService)
  userService = inject(UserService)

  // getStoredUserData() {
  //   const currentUserId: string | null = localStorage.getItem('authorized')
  //   const currentUserData = currentUserId ? localStorage.getItem(currentUserId) : null
  //   return currentUserData ? JSON.parse(currentUserData) : null
  // }

  getTasksData() {
    const storedTasks: ITask[] = this.userService.getStoredCurrentUserData().tasks
    this.tasksListSig.set(storedTasks)
  }

  getTasksDataByCategoryId(categoryId: string) {
    // this.getTasksData()
    this.tasksListSig.update(taskArr => taskArr.filter(task => task.category && task.category.id === categoryId))

  }

  updateStoredData(updatedData: IUser) {
    const currentUserId = this.userService.getCurrentUserId()
    if (currentUserId) {
      localStorage.setItem(currentUserId, JSON.stringify(updatedData))
    }
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
    // return this.userService.getStoredCurrentUserData().tasks
    return this.userService.getStoredCurrentUserData()
  }

  addTask(newTaskData: any, currentCategory: ICategory | null) {
    const storedData = this.userService.getStoredCurrentUserData()
    const newTask: ITask = {
      id: Math.random().toString(16),
      name: newTaskData.name.charAt(0).toUpperCase() + newTaskData.name.slice(1),
      complete: false,
      created: new Date().toLocaleDateString(),
      expiresIn: newTaskData.expiresIn,
      priority: newTaskData.priority,
      category: newTaskData.category || null
    }
    storedData.tasks.unshift(newTask)
    this.updateStoredData(storedData)
    this.updateTasksView(currentCategory)
  }

  toggleTaskStatus(taskToChangeStatus: ITask) {
    const storedData = this.userService.getStoredCurrentUserData()
    storedData.tasks = storedData.tasks.map((task) =>
      task.id === taskToChangeStatus.id
        ? {...task, complete: !!taskToChangeStatus.complete}
        : task)
    this.updateStoredData(storedData)
  }

  editTask(taskId: string, taskEditedData: any, currentCategory: ICategory | null) {
    // const storedData = this.userService.getStoredCurrentUserData()
    // const currentUserId = this.userService.getCurrentUserId()
    // let storedTasks: ITask[] = storedData.tasks
    // storedTasks = storedTasks.map((task: { id: string }) => task.id === taskId ? {
    //   ...task,
    //   id: task.id,
    //   name: taskEditedData.name,
    //   complete: taskEditedData.complete || false,
    //   expiresIn: taskEditedData.expiresIn,
    //   priority: taskEditedData.priority,
    //   category: taskEditedData.category
    // } : task)
    // localStorage.setItem('tasks', JSON.stringify(storedTasks))
    // this.updateTasksView(currentCategory)
  }

  deleteTask(id: string, currentCategory: ICategory | null) {
    const storedData = this.userService.getStoredCurrentUserData()
    storedData.tasks = storedData.tasks.filter((task: ITask) => task.id !== id)
    this.updateStoredData(storedData)
    this.updateTasksView(currentCategory)
  }
}
