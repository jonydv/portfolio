import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Observable } from 'rxjs';
import { LanguageSelectorService } from 'src/app/services/language-selector.service';
import { Language } from '../../models/language.interface';

@Component({
  selector: 'jdv-curriculum',
  templateUrl: './curriculum.component.html',
  styleUrls: ['./curriculum.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CurriculumComponent implements OnInit {

  name: string = 'Jonatan David Villalba';
  position: Language = {es: 'Desarrollador de software', en: 'Software developer'};
  language$: Observable<string> = this.languageSelectorService.getLanguage();

  constructor(private languageSelectorService: LanguageSelectorService) { }

  ngOnInit(): void {
  }

}
