import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})

export class FormService {
  public filterSubmittedSource = new Subject<void>()

  formSubmitted$ = this.filterSubmittedSource.asObservable()

  triggerFilterFormSubmitted() {
    this.filterSubmittedSource.next()
    // this.formSubmittedSource.next(false)
  }
}
