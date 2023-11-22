import {
  Component,
  inject,
  Input,
  OnInit,
} from '@angular/core'
import { CommonModule } from '@angular/common'
import { CalendarModule } from 'primeng/calendar'
import { DialogModule } from 'primeng/dialog'
import { DropdownModule } from 'primeng/dropdown'
import { PaginatorModule } from 'primeng/paginator'
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms'
import { TasksService } from '../../shared/services/tasks.service'
import { CategoriesService } from '../../shared/services/categories.service'
import { ModalService } from '../../shared/services/modal.service'
import { ICategory, ITask } from '../../shared/interfaces'

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [CommonModule, CalendarModule, DialogModule, DropdownModule, PaginatorModule, ReactiveFormsModule],
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.scss',
})
export class TaskFormComponent implements OnInit {

  @Input() formOptions: {
    isEditForm: boolean,
    taskToEdit?: ITask,
    currentCategory?: ICategory
  }

  form: FormGroup
  minDate: Date = new Date()

  tasksService = inject(TasksService)
  categoriesService = inject(CategoriesService)
  public modalService = inject(ModalService)

  ngOnInit() {
    this.form = new FormGroup<any>({
      name: new FormControl,
      expiresIn: new FormControl,
      category: new FormControl,
      priority: new FormControl
    })
    if (this.formOptions.isEditForm === false) {
      // this.form.reset()
      if (this.formOptions.currentCategory && this.formOptions.currentCategory.id !== 'all') {
        this.form.setValue({
          name: '',
          expiresIn: '',
          category: this.formOptions.currentCategory,
          priority: ''
        })
      }
    } else {
      this.form.setValue({
        name: this.formOptions.taskToEdit.name,
        expiresIn: this.formOptions.taskToEdit.expiresIn ? new Date(this.formOptions.taskToEdit.expiresIn) : '',
        category: this.formOptions.taskToEdit.category || null,
        priority: this.formOptions.taskToEdit.priority || null
      })
    }
  }

  onSubmitForm() {
    if (this.formOptions.isEditForm) {
      this.tasksService.editTask(this.formOptions.taskToEdit.id, this.form.value)
    } else {
      this.tasksService.addTask(this.form.value, this.formOptions.currentCategory)
    }
    this.modalService.closeModal()
  }
}

//TODO: refresh data after edit task

