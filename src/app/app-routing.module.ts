import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginPageComponent } from './login-page/login-page.component'
import { AuthLayoutComponent } from './shared/layouts/auth-layout/auth-layout.component'
import { RegisterPageComponent } from './register-page/register-page.component'
import { ContentPageComponent } from './content-page/content-page.component'
import { AuthGuard } from './shared/classes/auth.guard'
import { TasksTableComponent } from './content-page/tasks-table/tasks-table.component'

const routes: Routes = [
  {
    path: '', component: AuthLayoutComponent, children: [
      {path: '', redirectTo: '/login', pathMatch: 'full'},
      {path: 'login', component: LoginPageComponent},
      {path: 'register', component: RegisterPageComponent}
    ]
  },
  {
    path: '', canActivate: [AuthGuard], component: ContentPageComponent, children: [
      {path: 'tasks', component: TasksTableComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
