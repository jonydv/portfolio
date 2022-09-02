import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { LanguageSelectorService } from 'src/app/services/language-selector.service';
import { Language } from '../../../models/language.interface';

@Component({
  selector: 'jdv-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  contactTitle: Language = {
    es: 'Contacto',
    en: 'Contact'
  };
  contact = [
    {
      icon: 'fab fa-facebook-square',
      url: 'https://www.facebook.com/jonatan.villalba.14/',
      displayName: 'Facebook'
    },
    {
      icon: 'fab fa-linkedin',
      url: 'https://www.linkedin.com/in/jonatan-villalba-9126951b9/',
      displayName: 'LinkedIn'
    },
    {
      icon: 'fas fa-envelope',
      url: `mailto:?subject=jonatandavidvillalba@gmail.com&body=Hola me contacto por tu página web`,
      displayName: 'Gmail'
    }
  ];
  @Input() fromHome: boolean = false;
  language$: Observable<string> = this.languageSelectorService.getLanguage();

  constructor(private languageSelectorService: LanguageSelectorService) { }

  ngOnInit(): void {
  }

}
