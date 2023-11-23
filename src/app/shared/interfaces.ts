import { AbstractControl, ValidationErrors } from '@angular/forms'

export interface IUser {
  email: string | null
  password: string | null
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
  // email: [string, [AbstractControl:ValidationErrors | null, AbstractControl: ValidationErrors | null]]
  // password: [string, [AbstractControl:ValidationErrors | null, AbstractControl: ValidationErrors | null]]

  // email: AbstractControl<string | null>
  // password: AbstractControl<string | null>
  email: string | null
  password: string | null
}


