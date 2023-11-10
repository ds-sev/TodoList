import { Task } from '../app/shared/interfaces'
export const TASKS: Task[] = [
  {
    name: 'Изучить signals',
    complete: false,
    expiresIn: new Date(),
    category: 'Работа',
    priority: 'high'
  },
  {
    name: 'Накормить кота',
    complete: true,
    expiresIn: new Date(),
    priority: 'low'
  },
  {
    name: 'Выгулять пса',
    complete: false,
    expiresIn: new Date(),
    category: 'Домашние',
    priority: 'low'
  }
]
