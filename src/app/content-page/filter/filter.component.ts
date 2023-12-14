import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IFilterFormControls, ITask } from '../../shared/interfaces';
import { CategoriesService } from '../../shared/services/categories.service';
import { UserService } from '../../shared/services/user.service';
import { FilterService } from '../../shared/services/filter.service';
import { FormSubmitService } from '../../shared/services/formSubmit.service';

@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [CommonModule, CalendarModule, DropdownModule, InputTextModule, ReactiveFormsModule, FormsModule],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.scss'
})
export class FilterComponent implements OnInit, OnChanges {

  initialTasksList: ITask[] = [];

  @Input() isFilterVisible: boolean = false;

  formGroup = this.formBuilder.group<IFilterFormControls>({
    name: null,
    rangeDates: null,
    category: null,
    priority: null,
    almostOver: false,
    expired: false,
    completed: false,
  });

  constructor(
    private formBuilder: FormBuilder,
    public categoriesService: CategoriesService,
    private userService: UserService,
    public filterService: FilterService,
    private formService: FormSubmitService
  ) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['isFilterVisible'] && changes['isFilterVisible'].currentValue === true) {
      this.initialTasksList = this.userService.getStoredCurrentUserData().tasks;
      this.formGroup.reset();
    }
  }

  ngOnInit() {
    this.formGroup.valueChanges
    .subscribe((formValues) => {
      this.filterService.filterTasks(this.initialTasksList, formValues);
    });
  }

  onSubmitForm() {
    this.formService.triggerFilterFormSubmitted();
  }

  onResetFormClick() {
    this.formGroup.reset();
  }
}
