export interface User {
  email: string,
  password: string
}
export interface Task {
  name: string
  complete: boolean
  expiresIn?: Date
  category?: string
}

export interface Category {
  name: string
}

export interface Column {
  field: string;
  header: string;
}
