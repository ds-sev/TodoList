import { Component, OnDestroy, OnInit, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { CheckboxModule } from 'primeng/checkbox';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';

import { ICategory, ITask } from '../../shared/interfaces';
import { TaskWordEndingPipe } from '../../shared/pipes/task-word-ending.pipe';
import { TasksService } from '../../shared/services/tasks.service';
import { ModalService } from '../../shared/services/modal.service';
import { CategoriesService } from '../../shared/services/categories.service';
import { ActionsMenuComponent } from '../actions-menu/actions-menu.component';
import { TaskFormComponent } from '../task-form/task-form.component';
import { SearchBarComponent } from '../search-bar/search-bar.component';
import { FilterComponent } from '../filter/filter.component';
import { FilterService } from '../../shared/services/filter.service';
import { FormSubmitService } from '../../shared/services/formSubmit.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-tasks-table',
  standalone: true,
  imports: [CommonModule, CheckboxModule, FormsModule, TableModule, TaskWordEndingPipe, ActionsMenuComponent, TaskFormComponent, SearchBarComponent, FilterComponent],
  templateUrl: './tasks-table.component.html',
  styleUrl: './tasks-table.component.scss'
})
export class TasksTableComponent implements OnInit, OnDestroy {

  protected readonly window = window;

  foundedTasks: ITask[] = [];
  dataToEdit: {
    isEditForm: boolean,
    taskToEdit?: ITask,
    currentCategory?: ICategory
  } = {isEditForm: false};
  isSearchPerformed: boolean = false;
  isFilterVisible: boolean = false;
  isSelectSingleTask: boolean = false;
  currentCategory: ICategory | null = null;
  tasksListSig: WritableSignal<ITask[]> = this.tasksService.tasksListSig;
  private filteredTasks: ITask[] = [];
  private isFilterPerformed: boolean = false;
  private routeSubscription$: Subscription | undefined;
  private formSubscription$: Subscription | undefined;

  constructor(
    public router: Router,
    public modalService: ModalService,
    private route: ActivatedRoute,
    private tasksService: TasksService,
    private categoriesService: CategoriesService,
    private filterService: FilterService,
    private formService: FormSubmitService
  ) {
  }

  ngOnInit() {
    this.routeSubscription$ = this.route.params.subscribe(params => {
      this.tasksService.getTasksData();
      this.isFilterVisible = false;
      if (params.hasOwnProperty('id')) {
        this.getCurrentCategoryName(params['id']);
        this.tasksService.getTasksDataByCategoryId(params['id']);
      } else {
        this.currentCategory = null;
      }
    });

    this.formSubscription$ = this.formService.formSubmitted$.subscribe(() => {
      this.isSearchPerformed = false;
      this.isSelectSingleTask = false;
      this.isFilterPerformed = true;
      this.filteredTasks = this.filterService.filteredTasksSig();
    });
  }

  onAddTaskClick() {
    this.isFilterVisible = false;
    this.currentCategory
      ? this.dataToEdit = {isEditForm: false, currentCategory: this.currentCategory}
      : this.dataToEdit = {isEditForm: false};
    this.modalService.open('taskModal');
  }

  toggleFilterVisibility() {
    this.isFilterVisible = !this.isFilterVisible;
  }

  searchResult(value: ITask[]) {
    this.foundedTasks = value;
  }

  getFoundedTask(task: ITask) {
    this.foundedTasks = [];
    this.foundedTasks.push(task);
  }

  getSearchStatus(value: boolean) {
    this.isFilterVisible = false;
    this.isSearchPerformed = value;
  }

  getSingleTaskSelectedStatus(value: boolean) {
    this.isSelectSingleTask = value;
  }

  getCurrentCategoryName(currentCategoryId: string) {
    this.currentCategory = this.categoriesService.userCategoriesSig().find(category => category.id === currentCategoryId) || null;
  }

  toggleTaskState(taskToChangeStatus: ITask) {
    this.tasksService.toggleTaskStatus(taskToChangeStatus);
  }

  setExpirationWarningColor(expiresIn: Date): string {
    const currentDate = new Date();
    const expirationDate = new Date(expiresIn);
    const differenceInTime = expirationDate.getTime() - currentDate.getTime();
    const differenceInDays = Math.ceil(differenceInTime / (1000 * 3600 * 24));

    if (!expiresIn) {
      return 'inherit';
    } else if (differenceInDays < 0) {
      return 'gray';
    } else if (differenceInDays < 3) {
      return 'red';
    } else if (differenceInDays < 6) {
      return 'orange';
    } else {
      return 'inherit';
    }
  }

  getTasksForView(): ITask[] {
    if (this.isSearchPerformed || this.isSelectSingleTask) {
      return this.foundedTasks;
    } else if (this.isFilterPerformed) {
      return this.filteredTasks;
    } else {
      return this.tasksService.tasksListSig();
    }
  }

  ngOnDestroy() {
    if (this.routeSubscription$) {
      this.routeSubscription$.unsubscribe();
    }
    if (this.formSubscription$) {
      this.formSubscription$.unsubscribe();
    }
  }
}
