import { Component, OnInit } from '@angular/core'
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button'
import { CheckboxModule } from 'primeng/checkbox'
import { FormsModule } from '@angular/forms'
import { AuthService } from '../shared/services/auth.service'
import { Router, RouterLink, RouterOutlet } from '@angular/router'
import { CATEGORIES } from '../../temp/categories'
import { CategoriesComponent } from './categories/categories.component'

@Component({
  selector: 'app-content-page',
  standalone: true,
  imports: [CommonModule, ButtonModule, CheckboxModule, FormsModule, RouterOutlet, RouterLink, CategoriesComponent],
  templateUrl: './content-page.component.html',
  styleUrl: './content-page.component.scss'
})
export class ContentPageComponent {

  constructor(private authService: AuthService, private router: Router) {
  }

  logout() {
    this.authService.logout()
    this.router.navigate(['/login'])
  }
}

//TODO: signOut confirmation popup
//TODO: routing for user-added categories
//TODO: edit categories names
//TODO: delete category? with all tasks?
//TODO: edit styles
