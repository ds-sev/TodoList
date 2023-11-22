import { Component, OnInit } from '@angular/core'
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router'
import { PaginatorModule } from 'primeng/paginator'
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { Subscription } from 'rxjs'
import { AuthService } from '../shared/services/auth.service'
import { IAuthFormData, IUser } from '../shared/interfaces'

@Component({
  selector: 'app-register-page',
  standalone: true,
  imports: [CommonModule, RouterLink, PaginatorModule, ReactiveFormsModule],
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.scss'
})
export class RegisterPageComponent implements OnInit {

  form: FormGroup

  constructor(private authService: AuthService, private router: Router) {
  }

  ngOnInit(): void {
    this.form = new FormGroup<IAuthFormData>({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6)])
    })

    console.log(localStorage.getItem('user'))
  }

  onSubmit() {
    this.authService.register(this.form.value)
    this.router.navigate(['/login'])
  }
}
