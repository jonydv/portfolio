import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { LanguageSelectorService } from '../../../services/language-selector.service';

@Component({
  selector: 'jdv-language-selector',
  templateUrl: './language-selector.component.html',
  styleUrls: ['./language-selector.component.scss']
})
export class LanguageSelectorComponent implements OnInit {

  selected$: Observable<string> = this.languageSelectorService.getLanguage();
  constructor(
    private languageSelectorService: LanguageSelectorService
  ) { }

  ngOnInit(): void {
  }

  changeLanguage(language: string){
    this.languageSelectorService.setLanguage(language);
  }
}
