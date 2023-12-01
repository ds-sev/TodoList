import { Component, inject, OnInit } from '@angular/core'
import { CommonModule } from '@angular/common'
import { Router } from '@angular/router'
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { InputTextModule } from 'primeng/inputtext'

import { AuthService } from '../shared/services/auth.service'
import { IAuthFormControls } from '../shared/interfaces'

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, InputTextModule],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss'
})
export class LoginPageComponent implements OnInit {

  formBuilder = inject(FormBuilder)
  form!: FormGroup

  constructor(private authService: AuthService, private router: Router) {
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group<IAuthFormControls>({
      email: null,
      password: null
    });
    this.form.get('email')?.setValidators([Validators.required, Validators.email])
    this.form.get('password')?.setValidators([Validators.required, Validators.minLength(6)])
    this.form.updateValueAndValidity()
  }
  onSubmit() {
    this.authService.login(this.form.value)
    this.router.navigate(['/categories/all']).then()
  }
}
