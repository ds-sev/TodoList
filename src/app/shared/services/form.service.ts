import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})

export class FormService {
  public formSubmittedSource = new BehaviorSubject<boolean>(false)
  formSubmitted$ = this.formSubmittedSource.asObservable()

  triggerFormSubmitted() {
    this.formSubmittedSource.next(true)
    // this.formSubmittedSource.next(false)
  }
}
