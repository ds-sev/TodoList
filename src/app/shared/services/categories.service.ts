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
    return newCategory.id
  }

  editCategory(categoryToEdit: ICategory, updatedCategoryName: string) {
    this.storedData = this.userService.getStoredCurrentUserData()

    this.storedData.categories = this.storedData.categories.map((category: ICategory) =>
      category.id === categoryToEdit.id
        ? {...category, name: updatedCategoryName}
        : category
    )
    this.updateStoredData()
    this.tasksService.editTasksCategoryName(categoryToEdit, updatedCategoryName)
  }

  deleteCategory(categoryToDelete: ICategory) {
    this.storedData.categories = this.storedData.categories.filter((category: ICategory) =>
      category.id !== categoryToDelete.id)

    this.storedData.tasks = this.storedData.tasks.filter((task: ITask) =>
      task.category && task.category.id !== categoryToDelete.id
    )

    this.updateStoredData()
    this.tasksService.getTasksData()
  }

  checkForDuplicate(newCategoryName: string):boolean {
    const duplicateCategory = this.userCategoriesSig().find((category) => {
      return category.name.toLowerCase().split(' ').join('')
        === newCategoryName.toLowerCase().split(' ').join('')
    })
    return !!duplicateCategory
  }
}
