import { Component, OnInit } from '@angular/core';
import { BreakpointService } from '../../services/breakpoint.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'jdv-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  isMobile$: Observable<boolean> = this.breakpointService.isMobile$;
  constructor(private breakpointService: BreakpointService) {}

  ngOnInit(): void {}
}
