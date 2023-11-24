import { Component, inject, Input, OnDestroy, OnInit } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms'
import { DialogModule } from 'primeng/dialog'
import { ICategory } from '../../../shared/interfaces'
import { ModalService } from '../../../shared/services/modal.service'

@Component({
  selector: 'app-category-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, DialogModule],
  templateUrl: './category-form.component.html',
  styleUrl: './category-form.component.scss'
})
export class CategoryFormComponent implements OnInit, OnDestroy {

  modalService = inject(ModalService)

  categoryForm = new FormGroup({
    name: new FormControl,
  })

  displayModal: boolean = false
  @Input() categoryToEdit: ICategory | null = null

  ngOnInit() {
    console.log(this.categoryToEdit)
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
    // this.categoriesService.createCategory(this.categoryForm.value)
    this.displayModal = false
  }

  ngOnDestroy(): void {
    this.categoryToEdit = null
  }

}
