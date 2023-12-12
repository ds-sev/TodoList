import { Component, OnInit } from '@angular/core';
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

@Component({
  selector: 'app-tasks-table',
  standalone: true,
  imports: [CommonModule, CheckboxModule, FormsModule, TableModule, TaskWordEndingPipe, ActionsMenuComponent, TaskFormComponent, SearchBarComponent, FilterComponent],
  templateUrl: './tasks-table.component.html',
  styleUrl: './tasks-table.component.scss'
})
export class TasksTableComponent implements OnInit {

  protected readonly window = window;

  foundedTasks: ITask[] = [];
  dataToEdit: {
    isEditForm: boolean,
    taskToEdit?: ITask,
    currentCategory?: ICategory
  } = {isEditForm: false};
  isSearchPerformed: boolean = false;
  isFilterPerformed: boolean = false
  isSelectSingleTask: boolean = false;

  currentCategory: ICategory | null = null;

  constructor(
    private route: ActivatedRoute,
    public router: Router,
    public tasksService: TasksService,
    private categoriesService: CategoriesService,
    public modalService: ModalService,


  ) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.tasksService.getTasksData();
      if (params.hasOwnProperty('id')) {
        this.getCurrentCategoryName(params['id']);
        this.tasksService.getTasksDataByCategoryId(params['id']);
      } else {
        this.currentCategory = null;
      }
    });
  }

  onAddTaskClick() {
    this.currentCategory
      ? this.dataToEdit = {isEditForm: false, currentCategory: this.currentCategory}
      : this.dataToEdit = {isEditForm: false};
    this.modalService.open('taskModal');
  }

  onShowFilterClick() {
    this.modalService.open('filterModal')
  }

  searchResult(value: ITask[]) {
    this.foundedTasks = value;
  }

  getFoundedTask(task: ITask) {
    this.foundedTasks = [];
    this.foundedTasks.push(task);
  }

  getSearchStatus(value: boolean) {
    this.isSearchPerformed = value;
  }

  getFilterPerformStatus(value: boolean) {
    this.isFilterPerformed = value
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

  getTasksForView(): any {
    if (this.isSearchPerformed || this.isSelectSingleTask) {
      return this.foundedTasks;
    } else if (this.isFilterPerformed) {
      // this.filterS.filteredTasksListSig()
    } else {
      return this.tasksService.tasksListSig();
    }
  }
}
