import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ICategory, ITask } from '../../shared/interfaces';
import { ModalService } from '../../shared/services/modal.service';
import { TasksService } from '../../shared/services/tasks.service';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { TaskFormComponent } from '../task-form/task-form.component';
import { CategoriesService } from '../../shared/services/categories.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-actions-menu',
  standalone: true,
  imports: [CommonModule, ConfirmPopupModule, ToastModule, TaskFormComponent],
  templateUrl: './actions-menu.component.html',
  styleUrl: './actions-menu.component.scss',
  providers: [ConfirmationService]
})
export class ActionsMenuComponent {

  @Input() task?: ITask;
  @Input() currentCategory: ICategory | null = null;
  @Input() category?: ICategory;
  @Output() dataToEditEmit = new EventEmitter();

  constructor(
    private router: Router,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private modalService: ModalService,
    private taskService: TasksService,
    private categoriesService: CategoriesService,
  ) {
  }

  onEditClick() {
    if (this.task) {
      this.dataToEditEmit.emit({
        isEditForm: true,
        taskToEdit: this.task,
        currentCategory: this.currentCategory
      });
      this.modalService.open('taskModal');
    } else if (this.category) {
      this.dataToEditEmit.emit(this.category);
      this.modalService.open('categoryModal');
    }
  }

  confirm(event: Event) {
    this.confirmationService.confirm({
      target: event.target || undefined,
      message: `Удалить ${this.task ? 'задачу' : 'категорию и задачи относящиеся к ней'}?`,
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Да',
      rejectLabel: 'Отмена',
      accept: () => {
        if (this.task) {
          this.taskService.deleteTask(this.task.id, this.currentCategory);
          this.messageService.add({
            severity: 'info',
            summary: 'Задача удалена',
            key: 'notificationToast'
          });
        } else if (this.category) {
          this.categoriesService.deleteCategory(this.category);
          this.router.navigate(['/categories/all']).then();
          this.messageService.add({
            severity: 'info',
            summary: `Категория «${this.category.name}» удалена`,
            key: 'notificationToast'
          });
        }
      }
    });
  }
}
