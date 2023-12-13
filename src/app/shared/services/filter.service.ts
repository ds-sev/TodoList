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
    const almostOverThreshold = 3;



    //получаем отфильтрованный список на основе введенных данных из переданного массива задач
    this.filteredTasksSig.set(tasks.filter(task => {

      const taskCategoryId = task.category ? task.category.id : null;
      const taskExpiresInDate = task.expiresIn ? new Date(task.expiresIn) : null;
      const taskExpiresInTime = task.expiresIn ? new Date(task.expiresIn).getTime() : null;

      const daysDifference = this.getDifferenceInDays(taskExpiresInDate)
      console.log(task.priority);

      return (
        //ищем совпадение по имени
        (!formValues.name || task.name.toLowerCase().includes(formValues.name.toLowerCase())) &&
        //ищем совпадение по приоритету / если в форме приходит "0" - ищем задачи, для которых не задан приоритет
        (!formValues.priority || task.priority === formValues.priority || (formValues.priority === '0' && task.priority === null)) &&
        //ищем совпадение по категории
        (!categoryId || taskCategoryId === categoryId) &&
        //ищем совпадение по дате
        (!rangeDates.length || taskExpiresInTime &&
          (
            //учитываем случаи, если введена одна дата или диапазон дат
            rangeDates[1] === null || rangeDates[0].getTime() === rangeDates[1].getTime()
              ? new Date(taskExpiresInTime).getTime() === rangeDates[0].getTime()
              : new Date(taskExpiresInTime) >= rangeDates[0] && new Date(taskExpiresInTime) <= rangeDates[1]
          )
        ) &&
          //фильтр задач с оканчивающимся сроком исполнения
        (!formValues.almostOver || (daysDifference !== null && daysDifference <= almostOverThreshold && daysDifference >= 0)) &&
          //фильтр задач с истекшим сроком исполнения
        (!formValues.expired || (daysDifference !== null && daysDifference < 0)) &&
          //фильтр выполненных задач
        (!formValues.completed || task.complete === true)
      );
    }));
  }

  getDifferenceInDays(expirationDate: Date | null) {
    const currentDate = new Date()
    if (expirationDate) {
      const differenceInTime =  expirationDate.getTime() - currentDate.getTime();
      return  Math.ceil(differenceInTime / (1000 * 3600 * 24));
    }
    return null
  }
}
