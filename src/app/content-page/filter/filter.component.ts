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

    // forkJoin([
    //   this.formGroup.get('name')?.valueChanges,
    //   this.formGroup.get('priority')?.valueChanges,
    //   this.formGroup.get('category')?.valueChanges
    //   ])
    // .pipe(
    //   debounceTime(300),
    //   distinctUntilChanged()
    // )
    this.formGroup.valueChanges
    .subscribe((formValues) => {

      // if (nameValue !== undefined && priorityValue !== undefined && categoryValue !== undefined) {
      // }

      //получаем отфильтрованный список на основе введенных данных
      this.filteredTasks = this.tasksService.tasksListSig().filter(task => {
        if (task.expiresIn) {

        }

        if (formValues.rangeDates && formValues.rangeDates instanceof Array) {

          // console.log(formValues.rangeDates[0]); // Начальная дата
          // console.log(formValues.rangeDates[1]); // Конечная дата
        }

        return (
          (!formValues.name || task.name.toLowerCase().includes(formValues.name.toLowerCase())) &&

          (!formValues.priority || task.priority === formValues.priority) &&

          (!formValues.category?.id || task.category?.id === formValues.category?.id)

          &&

          (
            !formValues.rangeDates ||
            (
              task.expiresIn &&
              formValues.rangeDates instanceof Array &&
              (
                formValues.rangeDates[1] === null || formValues.rangeDates[0] == formValues.rangeDates[1]
                  ?

                  console.log(formValues.rangeDates[0], formValues.rangeDates[1])

                      // console.log(formValues.rangeDates[0], new Date(task.expiresIn))
                      // formValues.rangeDates[0] == new Date(task.expiresIn)
                  // new Date(task.expiresIn) >= formValues.rangeDates[0] && new Date(task.expiresIn) <= formValues.rangeDates[1]



                // : new Date(task.expiresIn) >= formValues.rangeDates[0] && new Date(task.expiresIn) <= formValues.rangeDates[1]
: console.log('2')




                // (!formValues.expiresIn || task.expiresIn === )

                // if (formValues.name) {
                //   console.log(task);
                //   return task.name.toLowerCase().includes(formValues.name.toLowerCase());
                //
                // } else if (formValues.priority) {
                //   return task.priority === formValues.priority
                // } else {
                //   return false;
                // }

                // console.log(this.filteredTasks);

              ))));
      });
    });
  }

  onSubmitForm() {
    console.log(this.formGroup.value);

  }

}
