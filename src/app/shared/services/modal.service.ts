import { Injectable } from '@angular/core'
import { ITask } from '../interfaces'

@Injectable({
  providedIn: 'root'
})

export class ModalService {

  displayModal: boolean = false
  isEditForm: boolean = false
  private modals: any[] = []

  setFormValue(taskToEditData: ITask) {
    console.log(taskToEditData)
  }

  openModal(taskToEdit?: ITask) {
    if (taskToEdit) {
      console.log(taskToEdit)
    }

    this.displayModal = true
  }

  closeModal() {
    this.displayModal = false
  }

  remove(id: string) {
    this.modals = this.modals.filter(x => x.id !== id)
  }
}
