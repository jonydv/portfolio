import { Injectable} from '@angular/core';
import {BreakpointObserver, BreakpointState} from '@angular/cdk/layout';
import { Observable} from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class BreakpointService {

  mobileBreakpoint: string = '(max-width: 992px)';
  constructor(private breakpointObserver: BreakpointObserver) {}

  public isMobile$: Observable<boolean> = this.breakpointObserver.observe([this.mobileBreakpoint]).pipe(
    map((state: BreakpointState) => state.matches ),
  );
}
