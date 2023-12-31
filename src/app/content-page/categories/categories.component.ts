import { Component, OnInit, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { ICategory } from '../../shared/interfaces';
import { ModalService } from '../../shared/services/modal.service';
import { CategoriesService } from '../../shared/services/categories.service';
import { CategoryFormComponent } from './category-form/category-form.component';
import { ActionsMenuComponent } from '../actions-menu/actions-menu.component';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [CommonModule, RouterModule, ActionsMenuComponent, CategoryFormComponent],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent implements OnInit {

  collapsed = true;
  categoryToEdit: ICategory | null = null;
  userCategoriesSig: WritableSignal<ICategory[]> = this.categoriesService.userCategoriesSig;

  constructor(
    private categoriesService: CategoriesService,
    public modalService: ModalService
  ) {
  }

  ngOnInit() {
    this.categoriesService.getUserCategories();
    this.collapseCategoriesMenuIfResize();
  }

  onAddCategoryClick() {
    this.categoryToEdit = null;
    this.modalService.open('categoryModal');
  }

  categoriesCollapseToggle() {
    this.collapsed = !this.collapsed;
  }

  // скрываем меню если пользователь кликает вне его
  collapseCategoriesMenu() {
    this.collapsed = true;
  }

  // скрываем меню если размер экрана уменьшается
  collapseCategoriesMenuIfResize() {
    window.addEventListener('resize', () => {
      if (window.innerWidth < 1024 && !this.collapsed) {
        this.collapseCategoriesMenu();
      }
    });
  }
}
