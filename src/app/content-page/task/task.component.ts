import { Component, inject, Input } from '@angular/core'
import { CommonModule } from '@angular/common';
import { ITask } from '../../shared/interfaces'
import { ButtonModule } from 'primeng/button'
import { CheckboxModule } from 'primeng/checkbox'
import { FormsModule } from '@angular/forms'
import { TasksService } from '../../shared/services/tasks.service'

@Component({
  selector: '[task-table-row]',
  standalone: true,
  imports: [CommonModule, ButtonModule, CheckboxModule, FormsModule],
  templateUrl: './task.component.html',
  styleUrl: './task.component.scss'
})
export class TaskComponent {
  @Input({required: true}) task!: ITask

  tasksService = inject(TasksService)

  onDeleteTaskClick() {
    this.tasksService.deleteTask(this.task.id)
  }

  toggleTaskState() {
    console.log(this.task)
  }
}
