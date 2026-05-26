import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { LanguageSelectorService } from 'src/app/services/language-selector.service';
import { Language } from '../../../models/language.interface';

@Component({
  selector: 'jdv-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactComponent {
  contactTitle: Language = {
    es: 'Contacto',
    en: 'Contact',
  };
  contact = [
    {
      icon: 'fab fa-github',
      url: 'https://github.com/jonydv',
      displayName: 'GitHub',
    },
    {
      icon: 'fab fa-linkedin',
      url: 'https://www.linkedin.com/in/jonatan-david-villalba/',
      displayName: 'LinkedIn',
    },
    {
      icon: 'fas fa-envelope',
      url: `mailto:jonatandavidvillalba@gmail.com?subject=Contacto desde tu página web&body=Hola me contacto por tu página web`,
      displayName: 'Gmail',
    },
  ];
  @Input() fromHome: boolean = false;
  language$: Observable<string> = this.languageSelectorService.getLanguage();

  constructor(private languageSelectorService: LanguageSelectorService) {}
}
