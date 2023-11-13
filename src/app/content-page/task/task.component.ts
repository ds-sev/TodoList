import { Component, EventEmitter, inject, Input, Output } from '@angular/core'
import { CommonModule } from '@angular/common';
import { ITask } from '../../shared/interfaces'
import { ButtonModule } from 'primeng/button'
import { CheckboxModule } from 'primeng/checkbox'
import { FormsModule } from '@angular/forms'
import { TasksService } from '../../shared/services/tasks.service'
import { TaskFormComponent } from '../task-form/task-form.component'
import { DialogModule } from 'primeng/dialog'

@Component({
  selector: '[task-table-row]',
  standalone: true,
  imports: [CommonModule, ButtonModule, CheckboxModule, FormsModule, TaskFormComponent, DialogModule],
  templateUrl: './task.component.html',
  styleUrl: './task.component.scss'
})
export class TaskComponent {
  @Input({required: true}) task!: ITask
  @Output() onEditClick = new EventEmitter()

  tasksService = inject(TasksService)
  editForm: TaskFormComponent

  openModal: boolean = false

  // public priority = Priority

  constructor() {

  }


  onDeleteTaskClick() {
    this.tasksService.deleteTask(this.task.id)
  }

  onEditTaskClick() {
    // this.editForm.displayModal = true
    console.log(this.task)
  }

  toggleTaskState() {
    console.log(this.task)
  }

}
