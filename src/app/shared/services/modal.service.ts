import { Injectable } from '@angular/core'

@Injectable({
  providedIn: 'root'
})

export class ModalService {

  displayTaskFormModal: boolean = false
  modalComponent: any
  modalData: any

  displayCategoryFormModal: boolean = false



  open(component: string , dataFromComponent?: any) {
    console.log(component)
    this.modalComponent = component
    this.modalData = dataFromComponent

    if (component === 'taskModal') {
      this.displayTaskFormModal = true
    } else if (component === 'categoryModal') {
      this.displayCategoryFormModal = true
    }
  }



  closeModal() {
    this.modalComponent = null
    this.modalData = null


    this.displayTaskFormModal = false
    // this.isDisplay$.next(false)
  }
}


