import { Injectable, signal, WritableSignal } from '@angular/core'
import { ICategory, IUser } from '../interfaces'
import { UserService } from './user.service'

@Injectable({
  providedIn: 'root'
})

export class CategoriesService {

  userCategoriesSig: WritableSignal<ICategory[]> = signal<ICategory[]>([])

  storedData!: IUser

  constructor(private userService: UserService) {
    this.storedData = this.userService.getStoredCurrentUserData()
  }

  getUserCategories() {
    this.userCategoriesSig.set(this.storedData.categories)
  }

  // updateStorageTasks() {
  //   localStorage.setItem('categories', JSON.stringify(this.storedData))
  // }

  updateStoredData() {
    const currentUserId = this.userService.getCurrentUserId()
    if (currentUserId) {
      localStorage.setItem(currentUserId, JSON.stringify(this.storedData))
    }
  }

  createCategory(newCategoryName: string) {
    const newCategory: ICategory = {
      id: Math.random().toString(16),
      name: newCategoryName.charAt(0).toUpperCase() + newCategoryName.slice(1)
    }
    this.storedData.categories.push(newCategory)
    // this.userCategoriesSig.update(categories => [...categories, newCategory])
    this.updateStoredData()
  }
}
