import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarModule } from 'primeng/calendar';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { PaginatorModule } from 'primeng/paginator';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ModalService } from '../../shared/services/modal.service';
import { ITask, ITaskFormControls } from '../../shared/interfaces';
import { CategoriesService } from '../../shared/services/categories.service';
import { UserService } from '../../shared/services/user.service';
import { TasksService } from '../../shared/services/tasks.service';

@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [CommonModule, CalendarModule, DialogModule, DropdownModule, InputTextModule, PaginatorModule, ReactiveFormsModule],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.scss'
})
export class FilterComponent implements OnInit {

  filteredTasks: ITask[] = [];

  formGroup = this.formBuilder.group<ITaskFormControls>({
    name: null,
    rangeDates: null,
    category: null,
    priority: null
  });

  constructor(
    private formBuilder: FormBuilder,
    public modalService: ModalService,
    public categoriesService: CategoriesService,
    private tasksService: TasksService,
    private userService: UserService
  ) {
  }

  ngOnInit() {
    this.tasksService.getTasksData();

    this.formGroup.valueChanges
    .subscribe((formValues) => {

      const categoryId = formValues.category ? formValues.category.id : null;
      const rangeDates = formValues.rangeDates || [];

      //получаем отфильтрованный список на основе введенных данных
      this.filteredTasks = this.tasksService.tasksListSig().filter(task => {

        const taskCategoryId = task.category ? task.category.id : null;
        const taskExpiresIn = task.expiresIn ? new Date(task.expiresIn).getTime() : null;

        return (
          //ищем совпадение по имени
          (!formValues.name || task.name.toLowerCase().includes(formValues.name.toLowerCase())) &&
          //ищем совпадение по приоритету
          (!formValues.priority || task.priority === formValues.priority) &&
          //ищем совпадение по категории
          (!categoryId || taskCategoryId === categoryId) &&
          //ищем совпадение по дате
          (!rangeDates.length || taskExpiresIn &&
            (
              //учитываем случаи, если введена одна дата или диапазон дат
              rangeDates[1] === null || rangeDates[0].getTime() === rangeDates[1].getTime()
                ? new Date(taskExpiresIn).getTime() === rangeDates[0].getTime()
                : new Date(taskExpiresIn) >= rangeDates[0] && new Date(taskExpiresIn) <= rangeDates[1]
            )
          )
        );
      });
    });
  }

  onSubmitForm() {
    console.log(this.formGroup.value);

  }
}
