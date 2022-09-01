import { Component } from '@angular/core';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { LoadingService } from './services/loading.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'portfolio';

  constructor(
    private router: Router,
    private loadingService: LoadingService
    ){}

  ngOnInit(): void {

    this.router.events.subscribe(
    event => {
      if(event instanceof NavigationStart){
        this.loadingService.showSpinner();
      }
      if(event instanceof NavigationEnd){
        this.loadingService.hideSpinner();
      }
    })

  }
}
