import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { LoadingService } from '../../../services/loading.service';
import { ScrollLockService } from '../../../services/scroll-lock.service';

@Component({
  selector: 'jdv-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent implements OnInit {

  showSpinner$: Observable<boolean> = this.loadingService.getSpinnerState().pipe(
    tap((visible) => {
      this.scrollLockService.handleLockBodyScroll(visible);
    })
  );

  constructor(
    private loadingService: LoadingService,
    private scrollLockService: ScrollLockService
  ) { }

  ngOnInit(): void {

  }

}
