import {Injectable, signal, WritableSignal} from '@angular/core'
import {ICategory, ITask, IUser} from '../interfaces'
import {UserService} from './user.service'
import {Router} from '@angular/router'

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  tasksListSig: WritableSignal<ITask[]> = signal<ITask[]>([])
  storedData!: IUser

  constructor(private userService: UserService, private router: Router) {
    this.storedData = this.userService.getStoredCurrentUserData()
  }

  getTasksData() {
    this.storedData = this.userService.getStoredCurrentUserData()
    this.tasksListSig.set(this.storedData.tasks)
  }

  getTasksDataByCategoryId(categoryId: string) {
    this.tasksListSig.update(taskArr =>
      taskArr.filter(task =>
        task.category && task.category.id === categoryId)
    )
  }

  updateStoredData() {
    const currentUserId = this.userService.getCurrentUserId()
    if (currentUserId) {
      localStorage.setItem(currentUserId, JSON.stringify(this.storedData))
    }
  }

  updateTasksView(currentCategory: ICategory | null) {
    if (currentCategory) {
      this.getTasksData()
      this.getTasksDataByCategoryId(currentCategory.id)
    } else {
      this.getTasksData()
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
    this.storedData.tasks.unshift(newTask)
    this.updateStoredData()
    this.updateTasksView(currentCategory)
  }

  toggleTaskStatus(taskToChangeStatus: ITask) {
    this.storedData.tasks = this.storedData.tasks.map((task) =>
      task.id === taskToChangeStatus.id
        ? {...task, complete: !!taskToChangeStatus.complete}
        : task)
    this.updateStoredData()
  }

  editTask(taskId: string, taskEditedData: any, currentCategory: ICategory | null) {
    this.storedData.tasks = this.storedData.tasks.map((task) => task.id === taskId ? {
      ...task,
      id: task.id,
      name: taskEditedData.name,
      complete: taskEditedData.complete || false,
      expiresIn: taskEditedData.expiresIn,
      priority: taskEditedData.priority,
      category: taskEditedData.category
    } : task)
    this.updateStoredData()
    this.updateTasksView(currentCategory)
  }

  deleteTask(id: string, currentCategory: ICategory | null) {
    this.storedData.tasks = this.storedData.tasks.filter((task: ITask) => task.id !== id)
    this.updateStoredData()
    this.updateTasksView(currentCategory)
  }

  editTasksCategoryName(category: ICategory, updatedCategoryName: string) {
    this.storedData = this.userService.getStoredCurrentUserData()
    this.storedData.tasks = this.storedData.tasks.map((task: ITask) =>
      task.category && task.category.id === category.id ? {
        ...task,
        category: {...category, name: updatedCategoryName}
      } : task)
    this.updateStoredData()
    if (this.router.url === '/categories/all') {
      this.updateTasksView(null)
    }
  }
}
