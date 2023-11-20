import { Component, inject, Input } from '@angular/core'
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button'
import { ICategory, ITask } from '../../shared/interfaces'
import { TaskModalService } from '../../shared/services/task-modal.service'

@Component({
  selector: 'app-actions-menu',
  standalone: true,
  imports: [CommonModule, ButtonModule],
  templateUrl: './actions-menu.component.html',
  styleUrl: './actions-menu.component.scss'
})
export class ActionsMenuComponent {

  taskModalService = inject(TaskModalService)

  @Input() task: ITask
  @Input() category: ICategory

  isDisplay: boolean
  isNewTask: boolean = false


  onEditClick() {
    if (this.task) {
      console.log(this.task)
    } else if (this.category) {
      console.log(this.category)
    }


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

}
