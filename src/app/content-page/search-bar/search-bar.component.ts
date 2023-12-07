import { Component, OnInit, signal, WritableSignal } from '@angular/core'
import { CommonModule } from '@angular/common'
import { TasksService } from '../../shared/services/tasks.service'
import { ITask } from '../../shared/interfaces'
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators
} from '@angular/forms'
import { NgSelectModule } from '@ng-select/ng-select'
import { debounceTime } from 'rxjs'

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NgSelectModule, FormsModule],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.scss'
})
export class SearchBarComponent implements OnInit {

  searchForm!: FormGroup
  autocompleteSuggestionsSig: WritableSignal<ITask[]> = signal<ITask[]>([])

  // selectedTask: number | null = null

  constructor(public tasksService: TasksService, private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    // this.tasksService.getTasksData()

    this.searchForm = new FormGroup({
      searchValue: new FormControl(null, Validators.required)
    })

    this.searchForm.get('searchValue')?.valueChanges
    .pipe(debounceTime(500))
    .subscribe(value => {
      this.autocompleteSuggestionsSig.set(this.tasksService.tasksListSig().filter(task => {
        return task.name.toLowerCase().includes(value.toLowerCase())
      }))
    })
  }

  onSearchSubmit() {
    // this.searchValue = this.searchForm.value.searchValue ?? ''
    // this.getData()
  }

}
