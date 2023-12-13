import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class ModalService {

  modalComponent: string | null = null;
  displayCategoryFormModal: boolean = false;
  displayTaskFormModal: boolean = false;

  open(component: string) {
    this.modalComponent = component;
    if (component === 'taskModal') {
      this.displayTaskFormModal = true;
    } else if (component === 'categoryModal') {
      this.displayCategoryFormModal = true;
    }
  }

  closeModal() {
    this.modalComponent = null;
    this.displayTaskFormModal = false;
    this.displayCategoryFormModal = false;
  }
}


