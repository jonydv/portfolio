import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Observable } from 'rxjs';
import { LanguageSelectorService } from 'src/app/services/language-selector.service';
import { Language } from '../../models/language.interface';
import { BreakpointService } from '../../services/breakpoint.service';

@Component({
  selector: 'jdv-curriculum',
  templateUrl: './curriculum.component.html',
  styleUrls: ['./curriculum.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class CurriculumComponent implements OnInit {
  name: string = 'Jonatan David Villalba';
  position: Language = {
    es: 'Desarrollador de software',
    en: 'Software developer',
  };
  language$: Observable<string> = this.languageSelectorService.getLanguage();
  isMobile$: Observable<boolean> = this.breakpointService.isMobile$;
  constructor(
    private languageSelectorService: LanguageSelectorService,
    private breakpointService: BreakpointService
  ) {}

  ngOnInit(): void {}
}
