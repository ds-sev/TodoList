import { Component, EventEmitter, OnInit, Output, signal, WritableSignal } from '@angular/core'
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
import { debounceTime, distinctUntilChanged } from 'rxjs'

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.scss'
})
export class SearchBarComponent implements OnInit {

  searchForm!: FormGroup
  autocompleteSuggestionsSig: WritableSignal<ITask[]> = signal<ITask[]>([])
  autocompleteVisible: boolean = false

  @Output() foundTasks = new EventEmitter<ITask[]>()
  @Output() searchPerformed = new EventEmitter<boolean>(false)

  constructor(public tasksService: TasksService, private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.searchForm = new FormGroup({
      searchValue: new FormControl(null, Validators.required)
    })

    this.searchForm.get('searchValue')?.valueChanges
    .pipe(
      debounceTime(100),
      distinctUntilChanged()
    )
    .subscribe(value => {
      const suggestions = this.tasksService.tasksListSig().filter(task => {
        return task.name.toLowerCase().includes(value.toLowerCase())
      })
      if (value) {
        this.autocompleteSuggestionsSig.set(suggestions)
        this.autocompleteVisible = true
      } else {
        this.autocompleteSuggestionsSig.set([])
        this.autocompleteVisible = false
      }
    })
  }

  onSearchSubmit() {
    if (!!this.searchForm.get('searchValue')?.value) {
      this.foundTasks.emit(this.autocompleteSuggestionsSig())
      this.searchPerformed.emit(true)
    }
  }
}
