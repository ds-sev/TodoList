import { Component, inject, Input, OnInit, } from '@angular/core'
import { CommonModule } from '@angular/common'
import { CalendarModule } from 'primeng/calendar'
import { DialogModule } from 'primeng/dialog'
import { DropdownModule } from 'primeng/dropdown'
import { PaginatorModule } from 'primeng/paginator'
import { FormBuilder, ReactiveFormsModule } from '@angular/forms'
import { TasksService } from '../../shared/services/tasks.service'
import { CategoriesService } from '../../shared/services/categories.service'
import { ModalService } from '../../shared/services/modal.service'
import { ICategory, ITask, ITaskFormControls } from '../../shared/interfaces'
import { InputTextModule } from 'primeng/inputtext'

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [CommonModule, CalendarModule, DialogModule, DropdownModule, PaginatorModule, ReactiveFormsModule, InputTextModule],
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.scss',
})
export class TaskFormComponent implements OnInit {

  @Input() formOptions: {
    taskToEdit?: ITask,
    currentCategory?: ICategory | null
  } = {}

  tasksService = inject(TasksService)
  categoriesService = inject(CategoriesService)
  public modalService = inject(ModalService)
  formBuilder = inject(FormBuilder)

  minDate: Date = new Date()
  formGroup = this.formBuilder.group<ITaskFormControls>({
    name: null,
    expiresIn: null,
    category: null,
    priority: null
  })

  ngOnInit() {
    if (!this.formOptions.taskToEdit) {
      if (this.formOptions.currentCategory && this.formOptions.currentCategory.id !== 'all') {
        this.formGroup.setValue({
          name: null,
          expiresIn: null,
          category: this.formOptions.currentCategory,
          priority: null
        })
      }
    } else if (this.formOptions.taskToEdit) {
      this.formGroup.setValue({
        name: this.formOptions.taskToEdit.name,
        expiresIn: this.formOptions.taskToEdit.expiresIn ? new Date(this.formOptions.taskToEdit.expiresIn) : '',
        category: this.formOptions.taskToEdit.category || null,
        priority: this.formOptions.taskToEdit.priority || null
      })
    }
  }

  onSubmitForm() {
    if (!this.formOptions.currentCategory) {
      this.formOptions.currentCategory = null
    }
    if (this.formOptions.taskToEdit && this.formOptions.taskToEdit.id) {
      this.tasksService.editTask(this.formOptions.taskToEdit.id, this.formGroup.value, this.formOptions.currentCategory)
    } else {
      this.tasksService.addTask(this.formGroup.value, this.formOptions.currentCategory)
    }
    this.modalService.closeModal()
  }
}

