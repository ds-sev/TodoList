import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';

import { AuthService } from '../shared/services/auth.service';
import { IAuthFormControls } from '../shared/interfaces';
import { LoaderComponent } from '../loader/loader.component';

@Component({
  selector: 'app-register-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, InputTextModule, LoaderComponent],
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.scss'
})
export class RegisterPageComponent {

  isLoading: boolean = false;
  form: FormGroup = this.formBuilder.group<IAuthFormControls>({
    email: new FormControl<string | null>(
      null, [Validators.required, Validators.email]
    ),
    password: new FormControl<string | null>(
      null, [Validators.required, Validators.minLength(6)]
    )
  });

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private authService: AuthService,
  ) {
  }

  onSubmit() {
    this.isLoading = true;
    this.authService.register(this.form.value).subscribe((isSuccess) => {
      if (isSuccess) {
        this.router.navigate(['/login']).then();
      }
      this.isLoading = false;
    });
    this.authService.register(this.form.value);
  }
}
