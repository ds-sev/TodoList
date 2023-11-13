import { Component, Input, OnInit } from '@angular/core'
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms'
import { CalendarModule } from 'primeng/calendar'
import { DialogModule } from 'primeng/dialog'

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [CommonModule, CalendarModule, DialogModule, FormsModule, ReactiveFormsModule],
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.scss'
})
export class TaskFormComponent implements OnInit{

  displayModal: boolean = false

  @Input() displayModalTrigger: boolean
  // displayModal: boolean = true

  form: FormGroup
  // displayModal: boolean = false


  ngOnInit() {
    console.log(this.displayModalTrigger)
    this.form = new FormGroup<any>({
      name: new FormControl,
      expiresIn: new FormControl,
      category: new FormControl,
      priority: new FormControl
    })
  }

  onSubmitForm() {
    console.log(this.form.value)
  }
}
