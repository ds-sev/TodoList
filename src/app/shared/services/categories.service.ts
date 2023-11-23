import { Injectable, signal, WritableSignal } from '@angular/core'
import { ICategory } from '../interfaces'

@Injectable({
  providedIn: 'root'
})

export class CategoriesService {

  userCategoriesSig: WritableSignal<ICategory[]> = signal<ICategory[]>([])

  getUserCategories() {
    const userCategories = localStorage.getItem('categories')
    if (userCategories) {
      this.userCategoriesSig.set(JSON.parse(userCategories))
    }
  }

  updateStorageTasks() {
    localStorage.setItem('categories', JSON.stringify(this.userCategoriesSig()))
  }

  createCategory(newCategoryData: ICategory) {

    const newCategory: ICategory = {
      id: Math.random().toString(16),
      name: newCategoryData.name.charAt(0).toUpperCase() + newCategoryData.name.slice(1)    }

    if (this.userCategoriesSig()) {
      this.userCategoriesSig.update(categories => [...categories, newCategory])
      this.updateStorageTasks()

    } else {
      localStorage.setItem('categories', JSON.stringify([newCategory]))
    }
  }
}
