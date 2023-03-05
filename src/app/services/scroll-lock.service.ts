import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ScrollLockService {
  constructor() {}

  lock() {
    this.validateSSR() ? null : document?.body?.classList?.add('lock');
  }

  unlock() {
    this.validateSSR() ? null : document?.body?.classList?.remove('lock');
  }

  handleLockBodyScroll(isVisible: boolean): void {
    this.validateSSR()
      ? null
      : document?.body?.classList?.toggle('lock-scroll', isVisible);
  }

  validateSSR() {
    const isSSR = typeof window === 'undefined';
    if (isSSR) {
      return true;
    } else {
      return false;
    }
  }
}
