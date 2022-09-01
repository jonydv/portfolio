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
      url: 'www.facebook.com'
    },
    {
      icon: 'fab fa-linkedin',
      url: 'www.linkedin.com'
    },
    {
      icon: 'fas fa-envelope',
      url: 'www.mail.com'
    }
  ];
  @Input() fromHome: boolean = false;
  language$: Observable<string> = this.languageSelectorService.getLanguage();

  constructor(private languageSelectorService: LanguageSelectorService) { }

  ngOnInit(): void {
  }

}
