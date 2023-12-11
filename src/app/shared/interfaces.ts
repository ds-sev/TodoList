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

export interface ITaskFormControls {
  name: string | null;
  expiresIn?: Date | string | null;
  category?: ICategory | null;
  priority?: '1' | '2' | '3' | null;
}

export interface IAuthFormControls {
  email: string | null;
  password: string | null;
}
