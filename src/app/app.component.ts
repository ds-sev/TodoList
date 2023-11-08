import { Component, OnInit } from '@angular/core'
import { Column, Task } from './shared/interfaces'
import { TasksService } from './shared/services/tasks.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  title = 'TodoList';
  tasks: Task[] = []
  cols: Column[]

  checked: boolean

  constructor(private tasksService: TasksService) {
  }

  ngOnInit() {
    this.tasksService.getTasksData()

    this.cols = [
      { field: 'code', header: 'Code' },
      { field: 'task', header: 'Task' },
      { field: 'category', header: 'Category' },
      { field: 'expiresIn', header: 'Expires' },
      { field: 'done', header: 'Done' },
      { field: 'edit', header: '' },
      { field: 'remove', header: '' },
    ]
  }

}
