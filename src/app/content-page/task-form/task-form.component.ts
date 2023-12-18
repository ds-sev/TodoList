import { Component, Input, OnInit, WritableSignal, } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CalendarModule } from 'primeng/calendar';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';

import { ICategory, ITask, ITaskFormControls } from '../../shared/interfaces';
import { TasksService } from '../../shared/services/tasks.service';
import { CategoriesService } from '../../shared/services/categories.service';
import { ModalService } from '../../shared/services/modal.service';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [CommonModule, CalendarModule, DialogModule, DropdownModule, ReactiveFormsModule, InputTextModule],
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.scss',
})
export class TaskFormComponent implements OnInit {

  minDate: Date = new Date();
  formGroup = this.formBuilder.group<ITaskFormControls>({
    name: null,
    expiresIn: null,
    category: null,
    priority: null
  });
  categoriesListSig: WritableSignal<ICategory[]> = this.categoriesService.userCategoriesSig;

  @Input() formOptions: {
    taskToEdit?: ITask,
    currentCategory?: ICategory | null
  } = {};

  constructor(
    public modalService: ModalService,
    private tasksService: TasksService,
    private categoriesService: CategoriesService,
    private formBuilder: FormBuilder
  ) {
  }

  ngOnInit() {

    this.formGroup.get('name')?.setValidators([Validators.required, Validators.minLength(3)]);
    this.formGroup.updateValueAndValidity();

    if (!this.formOptions.taskToEdit) {
      if (this.formOptions.currentCategory && this.formOptions.currentCategory.id !== 'all') {
        this.formGroup.setValue({
          name: null,
          expiresIn: null,
          category: this.formOptions.currentCategory,
          priority: null
        });
      }
    } else if (this.formOptions.taskToEdit) {
      this.formGroup.setValue({
        name: this.formOptions.taskToEdit.name,
        expiresIn: this.formOptions.taskToEdit.expiresIn ? new Date(this.formOptions.taskToEdit.expiresIn) : '',
        category: this.formOptions.taskToEdit.category || null,
        priority: this.formOptions.taskToEdit.priority || null
      });
    }
  }

  onSubmitForm() {
    if (!this.formOptions.currentCategory) {
      this.formOptions.currentCategory = null;
    }
    if (this.formOptions.taskToEdit && this.formOptions.taskToEdit.id) {
      this.tasksService.editTask(this.formOptions.taskToEdit.id, this.formGroup.value, this.formOptions.currentCategory);
    } else {
      this.tasksService.addTask(this.formGroup.value, this.formOptions.currentCategory);
    }
    this.modalService.closeModal();
  }
}
