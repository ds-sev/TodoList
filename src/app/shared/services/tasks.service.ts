import { computed, Injectable, signal, WritableSignal } from '@angular/core'
import { ICategory, ITask, ITaskFormControls } from '../interfaces'

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  tasksListSig: WritableSignal<ITask[]> = signal<ITask[]>([])
  filteredTasksSig = computed(() => this.tasksListSig)



  getTasksData() {
    // @ts-ignore
    this.tasksListSig.set(JSON.parse(localStorage.getItem('tasks')))
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
    // @ts-ignore
    return JSON.parse(localStorage.getItem('tasks'))
  }

  toggleTaskStatus(taskToChangeStatus: ITask) {
    let storedTasks = this.getStoredTasks()
    storedTasks = storedTasks.map((task: { id: string }) => task.id === taskToChangeStatus.id ? {
      ...task, complete: !!taskToChangeStatus.complete
    } : task)
    localStorage.setItem('tasks', JSON.stringify(storedTasks))
  }

  addTask(newTaskData: ITask, currentCategory: ICategory) {
    let storedTasks = this.getStoredTasks()
    const newTask: ITask = {
      id: Math.random().toString(16),
      name: newTaskData.name.charAt(0).toUpperCase() + newTaskData.name.slice(1),
      complete: false,
      created: new Date().toLocaleDateString(),
      expiresIn: newTaskData.expiresIn,
      priority: newTaskData.priority,
      category: newTaskData.category || null
    }
    if (storedTasks.length) {
      storedTasks.unshift(newTask)
      localStorage.setItem('tasks', JSON.stringify(storedTasks))

    } else {
      localStorage.setItem('tasks', JSON.stringify([newTask]))
    }

    this.updateTasksView(currentCategory)
  }

  editTask(taskId: string, taskEditedData: ITask) {
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
