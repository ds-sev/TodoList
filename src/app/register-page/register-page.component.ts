import { Component, OnInit } from '@angular/core'
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { PaginatorModule } from 'primeng/paginator'
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'

@Component({
  selector: 'app-register-page',
  standalone: true,
  imports: [CommonModule, RouterLink, PaginatorModule, ReactiveFormsModule],
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.scss'
})
export class RegisterPageComponent implements OnInit {

  form: FormGroup

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6)])
    })
  }

  onSubmit() {
    console.log('register')
  }



}
