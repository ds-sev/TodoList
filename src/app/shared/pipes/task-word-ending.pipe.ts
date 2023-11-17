import { Pipe, PipeTransform } from '@angular/core'

@Pipe({
  name: 'taskWordEnding',
  standalone: true
})

export class TaskWordEndingPipe implements PipeTransform {
  transform(value: number): string {
    if (value % 10 === 1 && value % 100 !== 11) {
      return 'задача'
    } else if (
      (value % 10 === 2 && value % 100 !== 12) ||
      (value % 10 === 3 && value % 100 !== 13) ||
      (value % 10 === 4 && value % 100 !== 14)
    ) {
      return 'задачи'
    } else {
      return 'задач'
    }
  }
}
