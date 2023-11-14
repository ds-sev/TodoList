import { Component, OnInit } from '@angular/core'
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button'
import { ICategory } from '../../shared/interfaces'
import { RouterLink } from '@angular/router'
import { CATEGORIES } from '../../../temp/categories'
import { CalendarModule } from 'primeng/calendar'
import { DialogModule } from 'primeng/dialog'
import { PaginatorModule } from 'primeng/paginator'
import { FormGroup, ReactiveFormsModule } from '@angular/forms'

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [CommonModule, ButtonModule, RouterLink, CalendarModule, DialogModule, PaginatorModule, ReactiveFormsModule],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent implements OnInit {

  categoriesList: ICategory[]

  displayModal: boolean = false
  form: FormGroup
  isEditForm: boolean

  ngOnInit() {
    this.categoriesList = CATEGORIES
  }

  onAddCategoryClick() {
    this.isEditForm = false
    this.displayModal = true
  }

  onSubmitForm() {
    console.log('submitCatForm')
  }
}
