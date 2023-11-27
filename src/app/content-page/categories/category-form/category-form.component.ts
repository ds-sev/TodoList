import { Component, inject, Input, OnInit } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms'
import { DialogModule } from 'primeng/dialog'
import { ICategory } from '../../../shared/interfaces'
import { ModalService } from '../../../shared/services/modal.service'
import { InputTextModule } from 'primeng/inputtext'
import { ButtonModule } from 'primeng/button'
import { CategoriesService } from '../../../shared/services/categories.service'

@Component({
  selector: 'app-category-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, DialogModule, InputTextModule, ButtonModule],
  templateUrl: './category-form.component.html',
  styleUrl: './category-form.component.scss'
})
export class CategoryFormComponent implements OnInit {

  modalService = inject(ModalService)
  categoriesService = inject(CategoriesService)

  categoryForm: FormGroup<{ name: FormControl<string | null> }> = new FormGroup({
    name: new FormControl(),
  })

  @Input() categoryToEdit: ICategory | null = null

  ngOnInit() {
    this.categoryForm.setValue({
      name: null
    })
    if (this.categoryToEdit) {
      this.categoryForm.setValue({
        name: this.categoryToEdit.name
      })
    }
  }

  onSubmitForm() {
    if (!this.categoryToEdit && this.categoryForm.value.name) {
      this.categoriesService.createCategory(this.categoryForm.value.name)

    } else if (this.categoryToEdit && this.categoryForm.value.name) {
      this.categoriesService.editCategory(this.categoryToEdit, this.categoryForm.value.name)
    }

    this.modalService.closeModal()
  }
}
