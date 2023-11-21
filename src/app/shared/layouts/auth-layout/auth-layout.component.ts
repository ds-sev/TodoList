import { Component, inject, OnInit } from '@angular/core'
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterOutlet } from '@angular/router'
import { ToastModule } from 'primeng/toast'

@Component({
  selector: 'app-auth-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, ToastModule],
  templateUrl: './auth-layout.component.html',
  styleUrl: './auth-layout.component.scss'
})
export class AuthLayoutComponent {
  constructor(public router: Router) {
  }
}
