import { Component, Input } from '@angular/core'
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button'
import { ICategory, ITask } from '../../shared/interfaces'

@Component({
  selector: 'app-actions-menu',
  standalone: true,
  imports: [CommonModule, ButtonModule],
  templateUrl: './actions-menu.component.html',
  styleUrl: './actions-menu.component.scss'
})
export class ActionsMenuComponent {

  @Input() target: ITask | ICategory

  constructor() {
    console.log(this.target)
  }

  isDisplay: boolean


  onEditClick(target: ITask | ICategory) {

    if ((<ITask>target).created) {
      console.log('this is task')
    } else {
      console.log('this is NOT task')
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
