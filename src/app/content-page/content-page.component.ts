import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

import { CategoriesComponent } from './categories/categories.component';

@Component({
  selector: 'app-content-page',
  standalone: true,
  imports: [CommonModule, RouterOutlet, CategoriesComponent],
  templateUrl: './content-page.component.html',
  styleUrl: './content-page.component.scss',
})
export class ContentPageComponent {
  showScrollToTopButton: boolean = false;

  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    this.showScrollToTopButton = window.pageYOffset > 0;
  }

  scrollToTop() {
    window.scrollTo(({top: 0, behavior: 'smooth'}));
  }
}
