import { FormControl } from '@angular/forms';

export interface IUser {
  email: string;
  password: string;
  tasks: ITask[];
  categories: ICategory[];
}

export interface ICategory {
  id: string;
  name: string;
}

export interface ITask {
  id: string;
  name: string;
  complete?: boolean;
  created?: string;
  expiresIn?: Date | null;
  category?: ICategory | null;
  priority?: '1' | '2' | '3' | null;
}

export interface IAuthFormControls {
  email: FormControl<string | null>;
  password: FormControl<string | null>;
}

export interface ITaskFormControls {
  name: FormControl<string | null>;
  expiresIn?: Date | string | null;
  category?: ICategory | null;
  priority?: '1' | '2' | '3' | null;
}

export interface IFilterFormControls extends ITaskFormControls {
  rangeDates: Date[] | null;
  almostOver: boolean;
  expired: boolean;
  completed: boolean;
}
