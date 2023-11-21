import { Component, OnInit } from '@angular/core'
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button'
import { CheckboxModule } from 'primeng/checkbox'
import { FormsModule } from '@angular/forms'
import { AuthService } from '../shared/services/auth.service'
import { Router, RouterLink, RouterOutlet } from '@angular/router'
import { CategoriesComponent } from './categories/categories.component'
import { TaskFormComponent } from './task-form/task-form.component'
import { ConfirmPopupComponent } from './confirm-popup/confirm-popup.component'

@Component({
  selector: 'app-content-page',
  standalone: true,
  imports: [CommonModule, ButtonModule, CheckboxModule, FormsModule, RouterOutlet, RouterLink, CategoriesComponent, TaskFormComponent, ConfirmPopupComponent],
  templateUrl: './content-page.component.html',
  styleUrl: './content-page.component.scss',
})
export class ContentPageComponent {

  constructor(private authService: AuthService, private router: Router) {

  }



}

//TODO: signOut confirmation popup
//TODO: routing for user-added categories
//TODO: edit categories names
//TODO: delete category? with all tasks?
//TODO: edit styles
