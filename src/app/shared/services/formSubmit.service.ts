import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})

export class FormSubmitService {
  public filterSubmittedSource = new Subject<void>();

  formSubmitted$ = this.filterSubmittedSource.asObservable();

  triggerFilterFormSubmitted() {
    this.filterSubmittedSource.next();
  }
}
