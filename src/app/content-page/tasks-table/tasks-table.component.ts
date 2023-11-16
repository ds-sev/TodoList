import { Component, inject, Input, OnInit, signal, WritableSignal, } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ButtonModule } from 'primeng/button'
import { CheckboxModule } from 'primeng/checkbox'
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms'
import { ITask } from '../../shared/interfaces'
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

@Component({
  selector: 'app-tasks-table',
  standalone: true,
  imports: [CommonModule, ButtonModule, CheckboxModule, FormsModule, DialogModule, DropdownModule, ReactiveFormsModule, CalendarModule, RadioButtonModule, CascadeSelectModule, RouterOutlet, TableModule, RippleModule],
  templateUrl: './tasks-table.component.html',
  styleUrl: './tasks-table.component.scss'
})
export class TasksTableComponent implements OnInit {

  @Input()
  checked: boolean

  // tasks: Task[]
  tasksPriority: ITask['priority']
  categories: []
  selectedCategory: string

  displayModal: boolean = false

  form: FormGroup

  tasksService = inject(TasksService)
  categoriesService = inject(CategoriesService)

  isEditForm: boolean = false

  minDate: Date = new Date()

  taskToEditId: string | null = null

  constructor(
    private route: ActivatedRoute,
    public router: Router
  ) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.tasksService.getTasksData()
      if (params.hasOwnProperty('id')) {

        this.tasksService.getTasksDataByCategoryId(params['id'])
      }
    })

    this.form = new FormGroup<any>({
      name: new FormControl,
      expiresIn: new FormControl,
      category: new FormControl,
      priority: new FormControl
    })

    console.log(this.tasksService.tasksListSig())
  }

  onAddTaskClick() {
    this.form.reset()
    this.isEditForm = false
    this.displayModal = true
  }

  onSubmitForm() {
    if (this.isEditForm) {
      this.tasksService.editTask(this.taskToEditId, this.form.value)
    } else {
      this.tasksService.addTask(this.form.value)
    }
    this.displayModal = false
  }

  onEditTaskClick(taskToEdit: ITask) {
    console.log(taskToEdit)
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
    this.tasksService.deleteTask(taskToRemove.id)
  }
}

//TODO: view category of task if selected All-view
//TODO: create validation for create/edit task form
//TODO: add colors for date-marked tasks fields
//TODO: create delete confirmation popup
//TODO: filter for tasks
