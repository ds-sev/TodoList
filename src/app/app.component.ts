import { Component, OnInit } from '@angular/core'
import { Column, Task } from './shared/interfaces'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  title = 'TodoList';
  tasks!: Task[];
  cols: Column[]

  constructor() {
  }

  ngOnInit() {
    this.cols = [
      { field: 'code', header: 'Code' },
      { field: 'task', header: 'Task' },
      { field: 'category', header: 'Category' },
      { field: 'expiresIn', header: 'Expires' },
    ]
  }
}
