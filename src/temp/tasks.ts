import { ITask } from '../app/shared/interfaces'

export const TASKS: ITask[] = [
  {
    id: '1',
    name: 'Изучить signals',
    complete: false,
    expiresIn: new Date(),
    category: {
      id: '1',
      name: 'Работа'
    },
    priority: 'high'
  },
  {
    id: '2',
    name: 'Накормить кота',
    complete: true,
    expiresIn: new Date(),
    priority: 'mid'
  },
  {
    id: '3',
    name: 'Выгулять пса',
    complete: false,
    expiresIn: new Date(),
    category: {
      id: '2',
      name: 'Домашние'
    },
    priority: 'low'
  },
  {
    id: '4',
    name: 'Выгулять пса',
    complete: false,
    expiresIn: new Date(),
    category: {
      id: '2',
      name: 'Домашние'
    },
  }
]
