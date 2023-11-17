import { Component, inject, OnInit } from '@angular/core'
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button'
import { ICategory } from '../../shared/interfaces'
import { ActivatedRoute, RouterLink, RouterModule } from '@angular/router'
import { CATEGORIES } from '../../../temp/categories'
import { CalendarModule } from 'primeng/calendar'
import { DialogModule } from 'primeng/dialog'
import { PaginatorModule } from 'primeng/paginator'
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms'
import { CategoriesService } from '../../shared/services/categories.service'
import { TasksService } from '../../shared/services/tasks.service'
import { log } from '@angular-devkit/build-angular/src/builders/ssr-dev-server'
import { tap } from 'rxjs'

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [CommonModule, ButtonModule, RouterLink, CalendarModule, DialogModule, PaginatorModule, ReactiveFormsModule, RouterModule],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent implements OnInit {

  tasksService = inject(TasksService)
  categoriesService = inject(CategoriesService)
  route = inject(ActivatedRoute)

  displayModal: boolean = false
  categoryForm: FormGroup
  isEditForm: boolean

  ngOnInit() {
    // this.categoriesList = CATEGORIES
    this.categoriesService.getUserCategories()

    // this.categoriesList = this.categoriesService.userCategoriesSig()

    this.categoryForm = new FormGroup<any>({
      name: new FormControl,
    })

    this.route.params.subscribe(params => {
      if (params.hasOwnProperty('id')) {
      }
    })
  }

  onCategoryClick(categoryId: string) {
    this.tasksService.getTasksDataByCategoryId(categoryId)
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
