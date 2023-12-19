import { Component, OnDestroy } from '@angular/core';
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
import { LoaderComponent } from '../loader/loader.component';
import { IAuthFormControls } from '../shared/interfaces';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, InputTextModule, LoaderComponent],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss'
})
export class LoginPageComponent implements OnDestroy {

  private loginSubscription: Subscription | undefined;
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
    private authService: AuthService
  ) {
  }

  onSubmit() {
    this.isLoading = true;
    this.loginSubscription = this.authService.login(this.form.value).subscribe(isLoggedIn => {
      if (isLoggedIn) {
        this.router.navigate(['/categories/all']).then();
      }
      this.isLoading = false;
    });
  }

  ngOnDestroy() {
    if (this.loginSubscription) {
      this.loginSubscription.unsubscribe();
    }
  }
}
