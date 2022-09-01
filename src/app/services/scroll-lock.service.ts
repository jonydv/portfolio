import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ScrollLockService {

  constructor() { }

  lock(){
    document?.body?.classList?.add('lock');

  }

  unlock(){
    document?.body?.classList?.remove('lock');
  }

  handleLockBodyScroll(isVisible: boolean): void {
    document?.body?.classList?.toggle('lock-scroll', isVisible);
  }
}
