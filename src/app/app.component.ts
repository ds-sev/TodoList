import { Component, OnInit } from '@angular/core'
import { ITask } from './shared/interfaces'
import { TasksService } from './shared/services/tasks.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  title = 'TodoList';
  tasks: ITask[] = []

  checked: boolean

  constructor(private tasksService: TasksService) {
  }

  ngOnInit() {
  }
}
