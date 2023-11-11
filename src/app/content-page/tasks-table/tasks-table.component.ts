import { ChangeDetectorRef, Component, OnInit, signal, WritableSignal } from '@angular/core'
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
import { Observable, Subject } from 'rxjs'

@Component({
  selector: 'app-tasks-table',
  standalone: true,
  imports: [CommonModule, ButtonModule, CheckboxModule, FormsModule, DialogModule, DropdownModule, ReactiveFormsModule, CalendarModule, RadioButtonModule],
  templateUrl: './tasks-table.component.html',
  styleUrl: './tasks-table.component.scss'
})
export class TasksTableComponent implements OnInit {
  checked: boolean

  // tasks: Task[]
  tasksPriority: Task['priority']
  categories: []
  selectedCategory: string

  displayModal: boolean = false

  tasks$: Observable<Task[]>

  form: FormGroup


  tasksList: WritableSignal<Task[]> = signal([])



  constructor(private tasksService: TasksService) {
  }

  ngOnInit() {
    // this.tasks = TASKS
    this.tasks$ = this.tasksService.getTasksData()
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
    console.log(this.form.value)
    this.tasksService.addTask(this.form.value)
    this.displayModal = false
    this.tasks$ = this.tasksService.getTasksData()
    this.tasks$.subscribe((task) => console.log(task.indexOf))
  }

  onDeleteTaskClick(index: number) {
    this.tasksService.deleteTask(index)
    this.tasks$ = this.tasksService.getTasksData()

  }
}
