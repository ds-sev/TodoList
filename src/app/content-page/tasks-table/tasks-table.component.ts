import { Component, OnInit } from '@angular/core'
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button'
import { CheckboxModule } from 'primeng/checkbox'
import { FormsModule } from '@angular/forms'
import { Task } from '../../shared/interfaces'
import { TASKS } from '../../../temp/tasks'

@Component({
  selector: 'app-tasks-table',
  standalone: true,
  imports: [CommonModule, ButtonModule, CheckboxModule, FormsModule],
  templateUrl: './tasks-table.component.html',
  styleUrl: './tasks-table.component.scss'
})
export class TasksTableComponent implements OnInit {
  checked: boolean

  tasks: Task[]

  ngOnInit() {
    this.tasks = TASKS
  }

  onAddTaskClick() {

  }
}
