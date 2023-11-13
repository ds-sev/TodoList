import { Component, inject, Input, OnInit, } from '@angular/core'
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

@Component({
  selector: 'app-tasks-table',
  standalone: true,
  imports: [CommonModule, ButtonModule, CheckboxModule, FormsModule, DialogModule, DropdownModule, ReactiveFormsModule, CalendarModule, RadioButtonModule, TaskComponent],
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

  isEditForm: boolean = false

  minDate: Date = new Date()


  // public priority = Priority

  ngOnInit() {
    this.tasksService.getTasksData()

    this.form = new FormGroup<any>({
      name: new FormControl,
      expiresIn: new FormControl,
      category: new FormControl,
      priority: new FormControl
    })
  }

  onAddTaskClick() {
    this.isEditForm = false
    this.displayModal = true
  }

  onSubmitForm() {
    this.tasksService.addTask(this.form.value)
    console.log(this.form.value)
    this.displayModal = false
    this.form.reset()
  }

  openEditTaskForm(taskData: ITask) {
    console.log(    taskData.expiresIn
    )
    this.isEditForm = true
    this.form.setValue({
      name: taskData.name,
      expiresIn: taskData.expiresIn,
      category: taskData.category || null,
      priority: taskData.priority || null
    })
    this.displayModal = true
  }
}

//TODO: correct calendar view
//TODO: view category of task if selected All-view
//TODO:
//TODO:
//TODO:
//TODO:
//TODO:
//TODO:
