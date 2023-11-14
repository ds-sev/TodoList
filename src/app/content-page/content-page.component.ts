import { Component, OnInit } from '@angular/core'
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button'
import { CheckboxModule } from 'primeng/checkbox'
import { FormsModule } from '@angular/forms'
import { AuthService } from '../shared/services/auth.service'
import { Router, RouterLink, RouterOutlet } from '@angular/router'
import { ICategory } from '../shared/interfaces'
import { CATEGORIES } from '../../temp/categories'

@Component({
  selector: 'app-content-page',
  standalone: true,
  imports: [CommonModule, ButtonModule, CheckboxModule, FormsModule, RouterOutlet, RouterLink],
  templateUrl: './content-page.component.html',
  styleUrl: './content-page.component.scss'
})
export class ContentPageComponent implements OnInit {

  categoriesList: ICategory[]


  constructor(private authService: AuthService, private router: Router) {
  }

  ngOnInit() {
    this.categoriesList = CATEGORIES
  }

  logout() {
    this.authService.logout()
    this.router.navigate(['/login'])
  }

  addCategory() {

  }
}

//TODO: move categories to separate component
//TODO:
//TODO:
//TODO:
//TODO:
//TODO: edit styles
