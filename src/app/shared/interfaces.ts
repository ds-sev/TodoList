import { AbstractControl } from '@angular/forms'

export interface IUser {
  email: string
  password: string
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
  expiresIn?: Date
  category?: ICategory
  priority?: 'low' | 'mid' | 'high'
}

export interface ITaskFormControls {
  name: AbstractControl<string>
  expiresIn?: AbstractControl<Date | string>
  category?: AbstractControl<ICategory>
  priority?: AbstractControl<'low' | 'mid' | 'high'>
}

export interface IAuthFormData {
  email: AbstractControl<string>
  password: AbstractControl<string>
}
