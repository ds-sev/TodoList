import {
  Component,
  ElementRef,
  EventEmitter,
  inject,
  Input, OnInit,
  Output, signal,
  ViewChild
} from '@angular/core'
import { CommonModule } from '@angular/common';
import { ITask } from '../../shared/interfaces'
import { ButtonModule } from 'primeng/button'
import { CheckboxModule } from 'primeng/checkbox'
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms'
import { TasksService } from '../../shared/services/tasks.service'
import { DialogModule } from 'primeng/dialog'
import { CalendarModule } from 'primeng/calendar'

@Component({
  selector: '[task-table-row]',
  standalone: true,
  imports: [CommonModule, ButtonModule, CheckboxModule, FormsModule, DialogModule, CalendarModule, ReactiveFormsModule],
  templateUrl: './task.component.html',
  styleUrl: './task.component.scss'
})
export class TaskComponent {
  @Input({required: true}) task!: ITask
  @Output() openEditForm = new EventEmitter<ITask>()

  tasksService = inject(TasksService)



  onDeleteTaskClick() {
    this.tasksService.deleteTask(this.task.id)
  }

  onEditTaskClick() {
    console.log(this.task)
    this.openEditForm.emit(this.task)
  }

  toggleTaskState() {
    console.log(this.task)
  }

  onSubmitForm() {
    console.log('submit edited form')
  }
}
