import { Component, inject, OnInit, } from '@angular/core'
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
  checked: boolean

  // tasks: Task[]
  tasksPriority: ITask['priority']
  categories: []
  selectedCategory: string

  displayModal: boolean = false

  form: FormGroup

  tasksService = inject(TasksService)

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
    this.displayModal = true
  }

  onSubmitForm() {
    this.tasksService.addTask(this.form.value)
    this.displayModal = false
    this.form.reset()
  }
}
