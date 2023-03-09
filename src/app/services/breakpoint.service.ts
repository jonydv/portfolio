import { Injectable } from '@angular/core';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class BreakpointService {
  mobileBreakpoint: string = '(max-width: 992px)';
  initialBreakpointState: BreakpointState = {
    matches: true,
    breakpoints: {
      '(max-width: 992px)': true,
    },
  };
  private calls: number = 0;
  constructor(private breakpointObserver: BreakpointObserver) {}

  public isMobile$: Observable<boolean> = this.breakpointObserver
    .observe([this.mobileBreakpoint])
    .pipe(
      map((state: BreakpointState) => {
        const isSSR = typeof window === 'undefined';
        this.calls++;
        return this.calls == 1 && isSSR
          ? this.initialBreakpointState.matches
          : state.matches;
      })
    );
}
