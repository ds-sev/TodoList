import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarModule } from 'primeng/calendar';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { PaginatorModule } from 'primeng/paginator';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ModalService } from '../../shared/services/modal.service';
import { ITaskFormControls } from '../../shared/interfaces';
import { CategoriesService } from '../../shared/services/categories.service';

@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [CommonModule, CalendarModule, DialogModule, DropdownModule, InputTextModule, PaginatorModule, ReactiveFormsModule],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.scss'
})
export class FilterComponent {

  formGroup = this.formBuilder.group<ITaskFormControls>({
    name: null,
    expiresIn: null,
    category: null,
    priority: null
  });

  constructor(
    private formBuilder: FormBuilder,
    public modalService: ModalService,
    public categoriesService: CategoriesService
  ) {
  }

  onSubmitForm() {

  }

}
