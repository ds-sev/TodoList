import { Injectable, signal, WritableSignal } from '@angular/core';
import { ICategory, ITask } from '../interfaces';

@Injectable({
  providedIn: 'root'
})

export class FilterService {

  filteredTasksSig: WritableSignal<ICategory[]> = signal<ICategory[]>([]);

  filterTasks(tasks: ITask[], formValues: any) {
    const categoryId = formValues.category ? formValues.category.id : null;
    const rangeDates = formValues.rangeDates || [];
    //получаем отфильтрованный список на основе введенных данных из переданного массива задач
    this.filteredTasksSig.set(tasks.filter(task => {

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
    }));
  }
}