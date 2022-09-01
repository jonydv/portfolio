import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  spinnerState$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  constructor() { }

  showSpinner() {
    this.spinnerState$.next(true);
  }

  hideSpinner() {
    this.spinnerState$.next(false);
  }

  getSpinnerState(): Observable<boolean> {
    return this.spinnerState$.pipe(map((spinnerState) => spinnerState));
  }
}
