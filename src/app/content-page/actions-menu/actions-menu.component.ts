import { Component, inject, Input } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ButtonModule } from 'primeng/button'
import { ICategory, ITask } from '../../shared/interfaces'
import { ModalService } from '../../shared/services/modal.service'
import { TasksService } from '../../shared/services/tasks.service'
import { ConfirmPopupModule } from 'primeng/confirmpopup'
import { ConfirmationService, MessageService } from 'primeng/api'
import { ToastModule } from 'primeng/toast'

@Component({
  selector: 'app-actions-menu',
  standalone: true,
  imports: [CommonModule, ButtonModule, ConfirmPopupModule, ToastModule],
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

  isDisplay: boolean
  isNewTask: boolean = false

  onEditClick() {
    if (this.task) {
      this.modalService.setFormValue(this.task)
      console.log(this.task)
    } else if (this.category) {
      console.log(this.category)
    }

    this.modalService.openModal()

    // if (target) {
    //   this.taskToEditId = taskToEdit.id
    //   this.isEditForm = true
    //   this.form.setValue({
    //     name: taskToEdit.name,
    //     expiresIn: taskToEdit.expiresIn ? new Date(taskToEdit.expiresIn) : '',
    //     category: taskToEdit.category || null,
    //     priority: taskToEdit.priority || null
    //   })
    //
    // }
    //
    // this.displayModal = true
  }

  onDeleteClick(target: any) {

  }

  toggleActionsMenu() {

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
            // detail: "You have accepted"
          })
          // this.taskService.deleteTask(this.task.id, this.currentCategory)
        }

      }
    })
  }

}
