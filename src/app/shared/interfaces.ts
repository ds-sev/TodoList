export interface IUser {
  email: string
  password: string
}

export interface ICategory {
  name: string
}

export interface ITask {
  id: string
  name: string
  complete: boolean
  expiresIn?: Date
  category?: ICategory | null
  priority?: 'low' | 'mid' | 'high'
}

// export enum Priority {
//   Low = 'Низкий',
//   Mid = 'Средний',
//   High = 'Высокий'
// }





