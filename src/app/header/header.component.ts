import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoriesComponent } from '../content-page/categories/categories.component'
import { ButtonModule } from 'primeng/button'
import { AuthService } from '../shared/services/auth.service'
import { Router } from '@angular/router'

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, CategoriesComponent, ButtonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  constructor(public authService: AuthService, private router: Router) {
  }

  logout() {
    this.authService.logout()
    this.router.navigate(['/login'])
  }

}
