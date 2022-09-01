import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LanguageSelectorService {
  language$: BehaviorSubject<string> = new BehaviorSubject<string>('es');
  constructor() { }

  setLanguage(language: string){
    this.language$.next(language);
  }

  getLanguage(): Observable<string>{
    return this.language$.asObservable();
  }
}
