import { Component, EventEmitter, inject, Input, Output } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ButtonModule } from 'primeng/button'
import { ICategory, ITask } from '../../shared/interfaces'
import { ModalService } from '../../shared/services/modal.service'
import { TasksService } from '../../shared/services/tasks.service'
import { ConfirmPopupModule } from 'primeng/confirmpopup'
import { ConfirmationService, MessageService } from 'primeng/api'
import { ToastModule } from 'primeng/toast'
import { TaskFormComponent } from '../task-form/task-form.component'

@Component({
  selector: 'app-actions-menu',
  standalone: true,
  imports: [CommonModule, ButtonModule, ConfirmPopupModule, ToastModule, TaskFormComponent],
  templateUrl: './actions-menu.component.html',
  styleUrl: './actions-menu.component.scss',
  providers: [ConfirmationService]
})
export class ActionsMenuComponent {

  modalService = inject(ModalService)
  taskService = inject(TasksService)
  messageService = inject(MessageService)
  confirmationService = inject(ConfirmationService)

  @Input() task: ITask
  @Input() currentCategory: ICategory
  @Input() category: ICategory
  @Output() dataToEdit = new EventEmitter()

  isDisplay: boolean

  onEditClick() {
    this.dataToEdit.emit({
      isEditForm: true,
      taskToEdit: this.task,
      currentCategory: this.currentCategory
    })
    if (this.task) {
      this.modalService.openModal()
      // this.modalService.setFormValue(this.task)
      // this.modalService.openModal(this.isEditForm)
      // console.log(this.task)
    } else if (this.category) {
    }
  }

  confirm(event: Event) {
    this.confirmationService.confirm({
      target: event.target,
      message: `Удалить ${this.task ? 'задачу' : 'категорию и задачи относящиеся к ней'}?`,
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Да',
      rejectLabel: 'Отмена',
      accept: () => {
        if (this.task) {
          this.taskService.deleteTask(this.task.id, this.currentCategory)
          this.messageService.add({
            severity: 'info',
            summary: 'Задача удалена',
            key: 'notificationToast'
          })
        } else {
          this.taskService.deleteTask(this.task.id, this.currentCategory)
          this.messageService.add({
            severity: 'info',
            summary: 'Категория удалена',
            key: 'notificationToast'
          })
        }
      }
    })
  }
}
