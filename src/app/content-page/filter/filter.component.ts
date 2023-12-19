import {
  Component,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
  WritableSignal
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { FormBuilder, FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ICategory, IFilterFormControls, ITask } from '../../shared/interfaces';
import { CategoriesService } from '../../shared/services/categories.service';
import { UserService } from '../../shared/services/user.service';
import { FilterService } from '../../shared/services/filter.service';
import { FormSubmitService } from '../../shared/services/formSubmit.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [CommonModule, CalendarModule, DropdownModule, InputTextModule, ReactiveFormsModule, FormsModule],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.scss'
})
export class FilterComponent implements OnInit, OnChanges, OnDestroy {

  private initialTasksList: ITask[] = [];
  private formSubscription$: Subscription | undefined;

  formGroup = this.formBuilder.group<IFilterFormControls>({
    name: new FormControl(null),
    rangeDates: null,
    category: null,
    priority: null,
    almostOver: false,
    expired: false,
    completed: false,
  });
  categoriesListSig: WritableSignal<ICategory[]> = this.categoriesService.userCategoriesSig;
  filteredTasksListSig: WritableSignal<ITask[]> = this.filterService.filteredTasksSig;

  @Input() isFilterVisible: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private categoriesService: CategoriesService,
    private userService: UserService,
    private filterService: FilterService,
    private formService: FormSubmitService
  ) {
  }

  ngOnInit() {
    this.formSubscription$ = this.formGroup.valueChanges
    .subscribe((formValues) => {
      this.filterService.filterTasks(this.initialTasksList, formValues);
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['isFilterVisible'] && changes['isFilterVisible'].currentValue === true) {
      this.initialTasksList = this.userService.getStoredCurrentUserData().tasks;
      this.formGroup.reset();
    }
  }

  onSubmitForm() {
    this.formService.triggerFilterFormSubmitted();
  }

  onResetFormClick() {
    this.formGroup.reset();
  }

  ngOnDestroy() {
    if (this.formSubscription$) {
      this.formSubscription$.unsubscribe();
    }
  }
}
