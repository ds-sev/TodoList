import {
  Component,
  EventEmitter,
  inject,
  Input,
  OnChanges,
  Output,
  SimpleChanges
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
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
  imports: [CommonModule, ButtonModule, ConfirmPopupModule, ToastModule, TaskFormComponent],
  templateUrl: './actions-menu.component.html',
  styleUrl: './actions-menu.component.scss',
  providers: [ConfirmationService]
})
export class ActionsMenuComponent implements OnChanges {

  modalService = inject(ModalService);
  taskService = inject(TasksService);
  categoriesService = inject(CategoriesService);
  messageService = inject(MessageService);
  confirmationService = inject(ConfirmationService);
  router = inject(Router);

  @Input() task?: ITask;
  @Input() currentCategory: ICategory | null = null;
  @Input() category?: ICategory;
  @Output() dataToEditEmit = new EventEmitter();

  isDisplay: boolean = false;

  ngOnChanges(changes: SimpleChanges) {
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
