export interface IUser {
  email: string
  password: string
  tasks: ITask[]
  categories: ICategory[]
}

export interface ICategory {
  id: string
  name: string
  isActionButtonsDisplay?: boolean
}

export interface ITask {
  id: string
  name: string
  complete?: boolean
  created?: string
  expiresIn?: Date | null
  category?: ICategory | null
  priority?: 'low' | 'mid' | 'high' | null
}

export interface ITaskFormControls {
  name: string | null
  expiresIn?: Date | string | null
  category?: ICategory | null
  priority?: 'low' | 'mid' | 'high' | null
}

export interface IAuthFormControls {
  email: string | null
  password: string | null
}


export interface ModalMetadata {
  type: ModalType
  content: string
}

enum ModalType {
  TASK,
  CATEGORY
}




