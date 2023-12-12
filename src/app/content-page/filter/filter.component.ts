import {
  AfterViewInit,
  Component,
  EventEmitter,
  Output,
  signal,
  WritableSignal
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarModule } from 'primeng/calendar';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { PaginatorModule } from 'primeng/paginator';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ModalService } from '../../shared/services/modal.service';
import { ITask, ITaskFormControls } from '../../shared/interfaces';
import { CategoriesService } from '../../shared/services/categories.service';
import { UserService } from '../../shared/services/user.service';
import { FilterService } from '../../shared/services/filter.service';

@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [CommonModule, CalendarModule, DialogModule, DropdownModule, InputTextModule, PaginatorModule, ReactiveFormsModule],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.scss'
})
export class FilterComponent implements AfterViewInit {

  filteredTasks: ITask[] = [];
  initialTasksList: ITask[] = [];

  formGroup = this.formBuilder.group<ITaskFormControls>({
    name: null,
    rangeDates: null,
    category: null,
    priority: null
  });

  filteredTasksSig: WritableSignal<ITask[]> = signal<ITask[]>([]);

  @Output() filterPerformed = new EventEmitter<boolean>(false);

  constructor(
    private formBuilder: FormBuilder,
    public modalService: ModalService,
    public categoriesService: CategoriesService,
    private userService: UserService,
    public filterService: FilterService
  ) {
  }

  ngAfterViewInit() {
    this.initialTasksList = this.userService.getStoredCurrentUserData().tasks;
    this.formGroup.valueChanges
    .subscribe((formValues) => {
      this.filterService.filterTasks(this.initialTasksList, formValues);
      // this.filteredTasksSig.set(this.filterTasksService.filterTasks(this.initialTasksList, formValues));
    });
  }

  onSubmitForm() {
    // console.log(this.filterTasksService.filteredTasksListSig());
    // console.log(this.formGroup.value);
    this.filterPerformed.emit(true);
  }
}
