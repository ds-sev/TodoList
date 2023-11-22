import { Component, Injectable, signal } from '@angular/core'
import { ICategory, ITask } from '../interfaces'

@Injectable({
  providedIn: 'root'
})

export class ModalService {

  // formOptionsSig = signal<{isEditForm?: boolean, task?: ITask, currentCategory?: ICategory}>({})




  displayModal: boolean = false
  // isEditForm: boolean = false
  private modals: any[] = []

  setFormValue(taskToEditData: ITask) {
    console.log(taskToEditData)
  }

  openModal(component?: Component, dataFromComponent?: any) {

    // if (this.formOptionsSig().isEditForm) {
    // }

    // if (taskToEdit) {
    //   console.log(taskToEdit)
    // }


    this.displayModal = true

  }

  closeModal() {
    this.displayModal = false
  }

  remove(id: string) {

  }

  // dataFromActions(data: any) {
  //   console.log(`data from actions: ${data}`)
  // }


}


