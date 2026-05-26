import { Component, Inject, OnInit } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { LoadingService } from './services/loading.service';
import { LanguageSelectorService } from './services/language-selector.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'portfolio';

  constructor(
    private router: Router,
    private loadingService: LoadingService,
    private languageSelectorService: LanguageSelectorService,
    @Inject(DOCUMENT) private document: Document
  ) {}

  ngOnInit(): void {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.loadingService.showSpinner();
      }
      if (event instanceof NavigationEnd) {
        this.loadingService.hideSpinner();
      }
    });

    this.languageSelectorService.getLanguage().subscribe(lang => {
      this.document.documentElement.lang = lang;
    });
  }
}
