import { Component } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ButtonModule } from 'primeng/button'
import { CheckboxModule } from 'primeng/checkbox'
import { FormsModule } from '@angular/forms'
import { RouterLink, RouterOutlet } from '@angular/router'
import { CategoriesComponent } from './categories/categories.component'
import { TaskFormComponent } from './task-form/task-form.component'

@Component({
  selector: 'app-content-page',
  standalone: true,
  imports: [CommonModule, ButtonModule, CheckboxModule, FormsModule, RouterOutlet, RouterLink, CategoriesComponent, TaskFormComponent],
  templateUrl: './content-page.component.html',
  styleUrl: './content-page.component.scss',
})
export class ContentPageComponent {
}

//TODO: edit categories
//TODO: delete category? with all tasks?
//TODO: edit styles
