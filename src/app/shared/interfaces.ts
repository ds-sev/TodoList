export interface IUser {
  email: string
  password: string
}

export interface ICategory {
  id: string
  name: string
}

export interface ITask {
  id: string
  name: string
  complete: boolean
  created: string,
  expiresIn?: Date
  category?: ICategory
  priority?: 'low' | 'mid' | 'high'
}

// export enum Priority {
//   Low = 'Низкий',
//   Mid = 'Средний',
//   High = 'Высокий'
// }





