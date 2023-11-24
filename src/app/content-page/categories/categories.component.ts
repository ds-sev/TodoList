import { Component, inject, OnInit } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ButtonModule } from 'primeng/button'
import { ActivatedRoute, RouterLink, RouterModule } from '@angular/router'
import { CalendarModule } from 'primeng/calendar'
import { DialogModule } from 'primeng/dialog'
import { PaginatorModule } from 'primeng/paginator'
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms'
import { CategoriesService } from '../../shared/services/categories.service'
import { ActionsMenuComponent } from '../actions-menu/actions-menu.component'
import { InputTextModule } from 'primeng/inputtext'
import { ICategory } from '../../shared/interfaces'
import { ModalService } from '../../shared/services/modal.service'
import { CategoryFormComponent } from './category-form/category-form.component'

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [CommonModule, ButtonModule, RouterLink, CalendarModule, DialogModule, PaginatorModule, ReactiveFormsModule, RouterModule, ActionsMenuComponent, InputTextModule, CategoryFormComponent],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent implements OnInit {

  // @ViewChild('categoryFormModal', { read: ViewContainerRef })
  //   modalContainerRef!: ViewContainerRef


  categoriesService = inject(CategoriesService)
  route = inject(ActivatedRoute)
  modalService = inject(ModalService)

  displayModal: boolean = false
  // categoryForm!: FormGroup
  isEditForm: boolean = false

  collapsed = true

  categoryToEdit: ICategory | null = null

  // categoryToEdit: ICategory | null = null

  isActionButtonsDisplay: boolean = false

  categoryForm = new FormGroup({
    name: new FormControl,
  })

  ngOnInit() {
    console.log(this.categoryToEdit)
    // if (!this.formOptions.taskToEdit) {
    this.categoriesService.getUserCategories()
    this.route.params.subscribe(params => {
      if (params.hasOwnProperty('id')) {
      }
    })

    this.collapseCategoriesMenuIfResize()
  }

  onAddCategoryClick() {
    this.categoryToEdit = null
    this.modalService.open('categoryModal')
  }


  onSubmitForm() {
    // this.categoriesService.createCategory(this.categoryForm.value)
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
      if (window.innerWidth < 1024 && !this.collapsed) {
        this.collapseCategoriesMenu()
      }
    })
  }
}
