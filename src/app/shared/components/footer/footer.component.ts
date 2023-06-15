import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { BreakpointService } from 'src/app/services/breakpoint.service';
import { LanguageSelectorService } from 'src/app/services/language-selector.service';
import { Language } from '../../../models/language.interface';

@Component({
  selector: 'jdv-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  name: string = 'Jonatan David Villalba'
  date: string = new Date(Date.now()).getFullYear().toString();
  copyright: Language = {es: 'Todos los derechos reservados', en: 'All rights reserved'};
  language$: Observable<string> = this.languageSelectorService.getLanguage();
  isMobile$: Observable<boolean> = this.breakpointService.isMobile$;
  certificationUrl: string = 'https://www.mercadopago.com.ar/developers/panel/developer-program/certification/cert_2d80b33ab42411ec95730242ac130004';
  constructor(
    private breakpointService: BreakpointService,
    private languageSelectorService: LanguageSelectorService
  ) { }

  ngOnInit(): void {

  }

}
