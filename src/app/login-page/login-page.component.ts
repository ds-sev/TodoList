import { Component, OnInit } from '@angular/core'
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router'
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators
} from '@angular/forms'
import { PasswordModule } from 'primeng/password'
import { AuthService } from '../shared/services/auth.service'
import { IAuthFormData } from '../shared/interfaces'

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule, PasswordModule, ReactiveFormsModule],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss'
})
export class LoginPageComponent implements OnInit {

  form: FormGroup

  constructor(private authService: AuthService, private router: Router) {
  }

  ngOnInit(): void {
    this.form = new FormGroup<IAuthFormData>({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6)])
    })
  }
  onSubmit() {
    this.authService.login(this.form.value)
    this.router.navigate(['/categories/all'])
  }
}
