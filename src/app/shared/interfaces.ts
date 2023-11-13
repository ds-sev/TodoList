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
  category?: string
  priority?: 'low' | 'mid' | 'high'
}





