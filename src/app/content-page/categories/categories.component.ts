import { Component, inject, OnInit } from '@angular/core'
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button'
import { ActivatedRoute, RouterLink, RouterModule } from '@angular/router'
import { CalendarModule } from 'primeng/calendar'
import { DialogModule } from 'primeng/dialog'
import { PaginatorModule } from 'primeng/paginator'
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms'
import { CategoriesService } from '../../shared/services/categories.service'
import { TasksService } from '../../shared/services/tasks.service'

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [CommonModule, ButtonModule, RouterLink, CalendarModule, DialogModule, PaginatorModule, ReactiveFormsModule, RouterModule],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent implements OnInit {

  categoriesService = inject(CategoriesService)
  route = inject(ActivatedRoute)

  displayModal: boolean = false
  categoryForm: FormGroup
  isEditForm: boolean

  collapsed = true

  ngOnInit() {
    this.categoriesService.getUserCategories()

    // this.categoriesList = this.categoriesService.userCategoriesSig()

    this.categoryForm = new FormGroup<any>({
      name: new FormControl,
    })

    this.route.params.subscribe(params => {
      if (params.hasOwnProperty('id')) {
      }
    })

    this.collapseCategoriesMenuIfResize()
  }

  onAddCategoryClick() {
    this.isEditForm = false
    this.displayModal = true
  }

  onSubmitForm() {
    this.categoriesService.createCategory(this.categoryForm.value)
    this.displayModal = false
  }

  categoriesCollapseToggle() {
    this.collapsed = !this.collapsed
  }

  // скрываем меню если пользователь кликает вне его
  collapseCategoriesMenu() {
    this.collapsed = true
  }

  // скрываем меню если размер экрана уменьшается
  collapseCategoriesMenuIfResize() {
    window.addEventListener('resize', () => {
      if (window.innerWidth < 1024 && this.collapsed === false) {
        this.collapseCategoriesMenu()
      }
    })
  }
}
