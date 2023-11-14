import { Injectable, signal, WritableSignal } from '@angular/core'
import { ICategory, ITask } from '../interfaces'

@Injectable({
  providedIn: 'root'
})



export class CategoriesService {

  categoriesListSig: WritableSignal<ICategory[]> = signal<ICategory[]>([])

  getUserCategoriesList() {

  }
}
