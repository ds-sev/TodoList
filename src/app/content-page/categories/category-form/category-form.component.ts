import { Component, inject, Input, OnInit } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { DialogModule } from 'primeng/dialog'
import { InputTextModule } from 'primeng/inputtext'
import { MessageService } from 'primeng/api'

import { ICategory } from '../../../shared/interfaces'
import { ModalService } from '../../../shared/services/modal.service'
import { CategoriesService } from '../../../shared/services/categories.service'

@Component({
  selector: 'app-category-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, DialogModule, InputTextModule],
  templateUrl: './category-form.component.html',
  styleUrl: './category-form.component.scss'
})
export class CategoryFormComponent implements OnInit {

  modalService = inject(ModalService)
  categoriesService = inject(CategoriesService)
  messageService = inject(MessageService)

  categoryForm: FormGroup<{ name: FormControl<string | null> }> = new FormGroup({
    name: new FormControl(),
  })

  @Input() categoryToEdit: ICategory | null = null

  ngOnInit() {
    this.categoryForm.setValue({
      name: null
    })

    this.categoryForm.get('name')?.setValidators([Validators.required, Validators.minLength(3)])
    this.categoryForm.updateValueAndValidity()

    if (this.categoryToEdit) {
      this.categoryForm.setValue({
        name: this.categoryToEdit.name
      })
    }
  }

  onSubmitForm() {
    if (!this.categoryToEdit && this.categoryForm.value.name) {
      if (this.categoriesService.checkForDuplicate(this.categoryForm.value.name)) {
        this.messageService.add({
          severity: 'warn',
          summary: 'Проблемка',
          detail: 'Такая категория уже есть',
          key: 'notificationToast'
        })
      } else {
        this.categoriesService.createCategory(this.categoryForm.value.name)
        this.modalService.closeModal()
      }
    } else if (this.categoryToEdit && this.categoryForm.value.name) {
      this.categoriesService.editCategory(this.categoryToEdit, this.categoryForm.value.name)
      this.modalService.closeModal()
    }
  }
}
