import { Component, inject, Input, OnInit, signal, } from '@angular/core'
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
import { TaskComponent } from '../task/task.component'
import { CascadeSelectModule } from 'primeng/cascadeselect'
import { CategoriesService } from '../../shared/services/categories.service'
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router'

@Component({
  selector: 'app-tasks-table',
  standalone: true,
  imports: [CommonModule, ButtonModule, CheckboxModule, FormsModule, DialogModule, DropdownModule, ReactiveFormsModule, CalendarModule, RadioButtonModule, TaskComponent, CascadeSelectModule, RouterOutlet],
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
    private router: Router
  ) {
  }
  // public priority = Priority



  ngOnInit() {
    // this.tasksService.getTasksData()

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

  openEditTaskForm(taskData: ITask) {
    this.taskToEditId = taskData.id
    this.isEditForm = true
    this.form.setValue({
      name: taskData.name,
      expiresIn: taskData.expiresIn ? new Date(taskData.expiresIn) : '',
      category: taskData.category || null,
      priority: taskData.priority || null
    })
    this.displayModal = true
  }
}

//TODO: view category of task if selected All-view
//TODO: create validation for create/edit task form
//TODO: add colors for date-marked tasks fields
//TODO: create delete confirmation popup
//TODO: filter for tasks
