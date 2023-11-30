import { Component, inject, OnInit } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ButtonModule } from 'primeng/button'
import { CheckboxModule } from 'primeng/checkbox'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { ICategory, ITask } from '../../shared/interfaces'
import { DialogModule } from 'primeng/dialog'
import { DropdownModule } from 'primeng/dropdown'
import { CalendarModule } from 'primeng/calendar'
import { RadioButtonModule } from 'primeng/radiobutton'
import { TasksService } from '../../shared/services/tasks.service'
import { CascadeSelectModule } from 'primeng/cascadeselect'
import { CategoriesService } from '../../shared/services/categories.service'
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router'
import { TableModule } from 'primeng/table'
import { RippleModule } from 'primeng/ripple'
import { TaskWordEndingPipe } from '../../shared/pipes/task-word-ending.pipe'
import { ContextMenuModule } from 'primeng/contextmenu'
import { ActionsMenuComponent } from '../actions-menu/actions-menu.component'
import { ModalService } from '../../shared/services/modal.service'
import { ToastModule } from 'primeng/toast'
import { TaskFormComponent } from '../task-form/task-form.component'

@Component({
  selector: 'app-tasks-table',
  standalone: true,
  imports: [CommonModule, ButtonModule, CheckboxModule, FormsModule, DialogModule, DropdownModule, ReactiveFormsModule, CalendarModule, RadioButtonModule, CascadeSelectModule, RouterOutlet, TableModule, RippleModule, TaskWordEndingPipe, ContextMenuModule, ActionsMenuComponent, ToastModule, TaskFormComponent],
  templateUrl: './tasks-table.component.html',
  styleUrl: './tasks-table.component.scss'
})
export class TasksTableComponent implements OnInit {

  tasksService = inject(TasksService)
  categoriesService = inject(CategoriesService)
  modalService = inject(ModalService)

  dataToEdit: {
    isEditForm: boolean,
    taskToEdit?: ITask,
    currentCategory?: ICategory
  } = {isEditForm: false}

  public currentCategory: ICategory | null = null

  constructor(private route: ActivatedRoute, public router: Router) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.tasksService.getTasksData()
      if (params.hasOwnProperty('id')) {
        this.getCurrentCategoryName(params['id'])
        this.tasksService.getTasksDataByCategoryId(params['id'])
      } else {
        this.currentCategory = null
      }
    })
  }

  getCurrentCategoryName(currentCategoryId: string) {
    this.currentCategory = this.categoriesService.userCategoriesSig().find(category => category.id === currentCategoryId) || null
  }

  onAddTaskClick() {
    this.currentCategory
      ? this.dataToEdit = {isEditForm: false, currentCategory: this.currentCategory}
      : this.dataToEdit = {isEditForm: false}
    this.modalService.open('taskModal')
  }

  toggleTaskState(taskToChangeStatus: ITask) {
    this.tasksService.toggleTaskStatus(taskToChangeStatus)
  }

  setExpirationWarningColor(expiresIn: Date): string {
    const currentDate = new Date()
    const expirationDate = new Date(expiresIn)
    const differenceInTime = expirationDate.getTime() - currentDate.getTime()
    const differenceInDays = Math.ceil(differenceInTime / (1000 * 3600 * 24))

    if (!expiresIn) {
      return 'inherit'
    } else if (differenceInDays < 0) {
      return 'gray'
    } else if (differenceInDays < 3) {
      return 'red'
    } else if (differenceInDays < 6) {
      return 'orange'
    } else {
      return 'inherit'
    }
  }

  onActionsMenuViewClick(task: any) {
    if (!task.isActionButtonsDisplay) {
      this.tasksService.tasksListSig().forEach((t: any) => {
        if (t !== task) {
          t.isActionButtonsDisplay = false
        }
      })
    }
    task.isActionButtonsDisplay = !task.isActionButtonsDisplay
  }

  protected readonly window = window
}
