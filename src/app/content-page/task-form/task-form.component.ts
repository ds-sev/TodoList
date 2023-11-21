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
import { ActivatedRoute, Router } from '@angular/router'

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [CommonModule, CalendarModule, DialogModule, DropdownModule, PaginatorModule, ReactiveFormsModule],
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.scss',
})
export class TaskFormComponent implements OnInit {

  // @Input() isEditForm: boolean
  @Input() isEditForm: boolean
  @Input() task: ITask
  @Input() formData: ITask
  checked: boolean

  categories: []

  displayModal: boolean = false

  form: FormGroup

  tasksService = inject(TasksService)
  categoriesService = inject(CategoriesService)
  public modalService = inject(ModalService)

  // isEditForm: boolean = false

  minDate: Date = new Date()

  taskToEditId: string | null = null

  currentCategory: ICategory = null

  // isActionButtonsDisplay: boolean

  constructor(
    private route: ActivatedRoute,
    public router: Router,
  ) {
  }

  ngOnInit() {
    console.log(this.modalService.formOptionsSig())
    this.form = new FormGroup<any>({
      name: new FormControl,
      expiresIn: new FormControl,
      category: new FormControl,
      priority: new FormControl
    })
  }



  getCurrentCategoryName(currentCategoryId: string) {
    this.currentCategory = this.categoriesService.userCategoriesSig().find(category => category.id === currentCategoryId)
  }

  onAddTaskClick() {
    this.modalService.formOptionsSig.set({})
    this.modalService.openModal()
    // this.form.reset()
    // this.isEditForm = false
    // this.displayModal = true
    // if (this.currentCategory && this.currentCategory.id !== 'all') {
    //   this.form.setValue({
    //     name: '',
    //     expiresIn: '',
    //     category: this.currentCategory,
    //     priority: ''
    //   })
    // }
  }

  onSubmitForm() {
    // if (this.isEditForm) {
    //   this.tasksService.editTask(this.taskToEditId, this.form.value)
    // } else {
    //   this.tasksService.addTask(this.form.value, this.currentCategory)
    // }
    // this.modalService.closeModal()
    // // this.currentCategory = null
  }

  // onEditTaskClick(taskToEdit: ITask) {
  //   this.taskToEditId = taskToEdit.id
  //   this.isEditForm = true
  //   this.form.setValue({
  //     name: taskToEdit.name,
  //     expiresIn: taskToEdit.expiresIn ? new Date(taskToEdit.expiresIn) : '',
  //     category: taskToEdit.category || null,
  //     priority: taskToEdit.priority || null
  //   })
  //   this.displayModal = true
  // }

  toggleTaskState(taskToChangeStatus: ITask) {
    this.tasksService.toggleTaskStatus(taskToChangeStatus)
  }

  onDeleteTaskClick(taskToRemove: ITask) {
    this.tasksService.deleteTask(taskToRemove.id, this.currentCategory)
  }

}

