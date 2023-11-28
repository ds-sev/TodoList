import { inject, Injectable, signal, WritableSignal } from '@angular/core'
import { ICategory, ITask, IUser } from '../interfaces'
import { UserService } from './user.service'
import { TasksService } from './tasks.service'

@Injectable({
  providedIn: 'root'
})

export class CategoriesService {

  userCategoriesSig: WritableSignal<ICategory[]> = signal<ICategory[]>([])

  tasksService = inject(TasksService)

  storedData!: IUser

  constructor(private userService: UserService) {
    this.storedData = this.userService.getStoredCurrentUserData()
  }

  getUserCategories() {
    this.userCategoriesSig.set(this.storedData.categories)
  }

  updateStoredData() {
    const currentUserId = this.userService.getCurrentUserId()
    if (currentUserId) {
      localStorage.setItem(currentUserId, JSON.stringify(this.storedData))
    }
    this.getUserCategories()
  }

  createCategory(newCategoryName: string) {
    const newCategory: ICategory = {
      id: Math.random().toString(16),
      name: newCategoryName.charAt(0).toUpperCase() + newCategoryName.slice(1)
    }
    this.storedData.categories.push(newCategory)
    this.updateStoredData()
  }

  editCategory(categoryToEdit: ICategory, updatedCategoryName: string) {
    this.storedData.categories = this.storedData.categories.map((category: ICategory) =>
      category.id === categoryToEdit.id
        ? {...category, name: updatedCategoryName}
        : category
    )
    this.updateStoredData()
  }

  //TODO: finish delete category method
  deleteCategory(categoryToDelete: ICategory) {
    this.storedData.categories = this.storedData.categories.filter((category: ICategory) =>
    category.id !== categoryToDelete.id)
    this.storedData.tasks = this.storedData.tasks.filter((task: ITask) =>
      task.category !== categoryToDelete
    )

    this.updateStoredData()
    this.tasksService.getTasksData()
    // this.tasksService.updateStoredData()
  }
}
