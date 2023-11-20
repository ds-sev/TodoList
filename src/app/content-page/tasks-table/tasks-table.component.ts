import { Component, importProvidersFrom, inject, Input, OnInit } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ButtonModule } from 'primeng/button'
import { CheckboxModule } from 'primeng/checkbox'
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms'
import { ICategory, ITask } from '../../shared/interfaces'
import { DialogModule } from 'primeng/dialog'
import { DropdownModule } from 'primeng/dropdown'
import { CalendarModule } from 'primeng/calendar'
import { RadioButtonModule } from 'primeng/radiobutton'
import { TasksService } from '../../shared/services/tasks.service'
import { CascadeSelectModule } from 'primeng/cascadeselect'
import { CategoriesService } from '../../shared/services/categories.service'
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router'
import { TableModule } from 'primeng/table'
import { RippleModule } from 'primeng/ripple'
import { TaskWordEndingPipe } from '../../shared/pipes/task-word-ending.pipe'
import { ContextMenuModule } from 'primeng/contextmenu'
import { ActionsMenuComponent } from '../actions-menu/actions-menu.component'
import { TaskModalService } from '../../shared/services/task-modal.service'

@Component({
  selector: 'app-tasks-table',
  standalone: true,
  imports: [CommonModule, ButtonModule, CheckboxModule, FormsModule, DialogModule, DropdownModule, ReactiveFormsModule, CalendarModule, RadioButtonModule, CascadeSelectModule, RouterOutlet, TableModule, RippleModule, TaskWordEndingPipe, ContextMenuModule, ActionsMenuComponent],
  templateUrl: './tasks-table.component.html',
  styleUrl: './tasks-table.component.scss'
})
export class TasksTableComponent implements OnInit {

  @Input()
  checked: boolean

  categories: []

  displayModal: boolean = false

  form: FormGroup

  tasksService = inject(TasksService)
  categoriesService = inject(CategoriesService)
  taskModalService = inject(TaskModalService)

  isEditForm: boolean = false

  minDate: Date = new Date()

  taskToEditId: string | null = null

  currentCategory: ICategory = null


  // isActionButtonsDisplay: boolean

  constructor(
    private route: ActivatedRoute,
    public router: Router
  ) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.tasksService.getTasksData()
      if (params.hasOwnProperty('id')) {
        this.getCurrentCategoryName(params['id'])
        this.tasksService.getTasksDataByCategoryId(params['id'])
      }
    })

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
    this.taskModalService.openModal()

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
    if (this.isEditForm) {
      this.tasksService.editTask(this.taskToEditId, this.form.value)
    } else {
      this.tasksService.addTask(this.form.value, this.currentCategory)
    }
    this.displayModal = false
    // this.currentCategory = null
  }

  onEditTaskClick(taskToEdit: ITask) {
    this.taskToEditId = taskToEdit.id
    this.isEditForm = true
    this.form.setValue({
      name: taskToEdit.name,
      expiresIn: taskToEdit.expiresIn ? new Date(taskToEdit.expiresIn) : '',
      category: taskToEdit.category || null,
      priority: taskToEdit.priority || null
    })
    this.displayModal = true
  }

  toggleTaskState(taskToChangeStatus: ITask) {
    this.tasksService.toggleTaskStatus(taskToChangeStatus)
  }

  onDeleteTaskClick(taskToRemove: ITask) {
    this.tasksService.deleteTask(taskToRemove.id, this.currentCategory)
  }

  protected readonly console = console
}

//TODO: view category of task if selected All-view
//TODO: create validation for create/edit task form
//TODO: add colors for date-marked tasks fields
//TODO: create delete confirmation popup
//TODO: filter for tasks


