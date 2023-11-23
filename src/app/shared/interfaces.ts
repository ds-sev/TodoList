import { AbstractControl, ValidationErrors } from '@angular/forms'

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
  expiresIn?: Date | null
  category?: ICategory | null
  priority?: 'low' | 'mid' | 'high' | null
}

export interface ITaskFormControls {
  name: string | null
  expiresIn?: Date | string | null
  category?: ICategory | null
  priority?: 'low' | 'mid' | 'high' | null

  // name: AbstractControl<string | null>
  // expiresIn?: AbstractControl<Date | string>
  // category?: AbstractControl<ICategory | null>
  // priority?: AbstractControl<'low' | 'mid' | 'high' | null>
}

export interface IAuthFormData {
  email: string | null
  password: string | null
}




