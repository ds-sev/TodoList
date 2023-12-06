import { Component, inject, OnInit } from '@angular/core'
import { CommonModule } from '@angular/common'
import { Router } from '@angular/router'
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { InputTextModule } from 'primeng/inputtext'

import { AuthService } from '../shared/services/auth.service'
import { IAuthFormControls } from '../shared/interfaces'
import { LoaderComponent } from "../loader/loader.component";

@Component({
  selector: 'app-register-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, InputTextModule, LoaderComponent],
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.scss'
})
export class RegisterPageComponent implements OnInit {

  formBuilder = inject(FormBuilder)
  form!: FormGroup
  isLoading: boolean = false

  constructor(private authService: AuthService, private router: Router) {
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group<IAuthFormControls>({
      email: null,
      password: null,
    })
    this.form.get('email')?.setValidators([Validators.required, Validators.email])
    this.form.get('password')?.setValidators([Validators.required, Validators.minLength(6)])
    this.form.updateValueAndValidity()
  }

  onSubmit() {
    this.isLoading = true
    this.authService.register(this.form.value).subscribe((isSuccess) => {
      if (isSuccess) {
        this.router.navigate(['/login']).then()
      }
      this.isLoading = false
    })
    this.authService.register(this.form.value)
  }
}
