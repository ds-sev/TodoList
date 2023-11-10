import { Component, OnInit } from '@angular/core'
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button'
import { CheckboxModule } from 'primeng/checkbox'
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms'
import { Task } from '../../shared/interfaces'
import { TASKS } from '../../../temp/tasks'
import { DialogModule } from 'primeng/dialog'
import { DropdownModule } from 'primeng/dropdown'
import { CalendarModule } from 'primeng/calendar'
import { RadioButtonModule } from 'primeng/radiobutton'
import { TasksService } from '../../shared/services/tasks.service'

@Component({
  selector: 'app-tasks-table',
  standalone: true,
  imports: [CommonModule, ButtonModule, CheckboxModule, FormsModule, DialogModule, DropdownModule, ReactiveFormsModule, CalendarModule, RadioButtonModule],
  templateUrl: './tasks-table.component.html',
  styleUrl: './tasks-table.component.scss'
})
export class TasksTableComponent implements OnInit {
  checked: boolean

  tasks: Task[]
  tasksPriority: Task['priority']
  categories: []
  selectedCategory: string

  displayModal: boolean = false

  form: FormGroup

  constructor(private tasksService: TasksService) {
  }






  ngOnInit() {
    this.tasks = TASKS
    this.form = new FormGroup<any>({
      name: new FormControl,
      expiresIn: new FormControl,
      category: new FormControl,
      priority: new FormControl
    })

    console.log(this.tasksService.getTasksData())
  }

  onAddTaskClick() {
    this.displayModal = true
    console.log('modal')
  }

  onSubmitForm() {
    console.log(this.form.value)
    this.tasksService.addTask(this.form.value)
  }
}
