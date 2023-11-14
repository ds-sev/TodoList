import { Component, inject, OnInit } from '@angular/core'
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button'
import { ICategory } from '../../shared/interfaces'
import { RouterLink } from '@angular/router'
import { CATEGORIES } from '../../../temp/categories'
import { CalendarModule } from 'primeng/calendar'
import { DialogModule } from 'primeng/dialog'
import { PaginatorModule } from 'primeng/paginator'
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms'
import { CategoriesService } from '../../shared/services/categories.service'

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [CommonModule, ButtonModule, RouterLink, CalendarModule, DialogModule, PaginatorModule, ReactiveFormsModule],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent implements OnInit {

  categoriesService = inject(CategoriesService)

  categoriesList: ICategory[]

  displayModal: boolean = false
  categoryForm: FormGroup
  isEditForm: boolean

  ngOnInit() {
    // this.categoriesList = CATEGORIES
    this.categoriesService.getUserCategories()

    this.categoriesList = this.categoriesService.userCategoriesSig()

    this.categoryForm = new FormGroup<any>({
      name: new FormControl,
    })
  }

  onAddCategoryClick() {
    this.isEditForm = false
    this.displayModal = true
  }

  onSubmitForm() {
    this.categoriesService.createCategory(this.categoryForm.value)
    this.displayModal = false
  }
}
