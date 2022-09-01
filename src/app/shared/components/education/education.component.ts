import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Language } from 'src/app/models/language.interface';
import { LanguageSelectorService } from 'src/app/services/language-selector.service';
import { Education } from '../../../models/education.interface';

@Component({
  selector: 'jdv-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.scss']
})
export class EducationComponent implements OnInit {

  title: Language = {es: 'Educación', en: 'Education'};
  viewCertificate: Language = {es: 'Ver Certificado en linea', en: 'View Online Certificate'};
  courses: Education[] = [
    {
      icon: 'fas fa-university',
      school: {es: 'Universidad Nacional De José C. Paz', en: 'National University Of José C. Paz'},
      title: {es: 'Licenciatura en gestión de tecnologías de la información (Cursando actualmente)',
      en: 'Bachelors Degree in Information Technology Management (Currently studying)'},
      subtitle: {es: 'Analista de sistemas (Titulo de pre-grado)', en: 'Systems Analyst'}
    },
    {
      icon: 'fas fa-university',
      school: {es: 'Universidad Austral', en: 'Austral University'},
      title: {es: 'Desarrollo del lado servidor: NodeJs, Express y MongoDb',
      en: 'Server-side development: NodeJs, Express and MongoDb'},
      link: 'https://www.coursera.org/account/accomplishments/certificate/VHFUMEB7WBXN'
    },
    {
      icon: 'fas fa-university',
      school: {es: 'Mercado Pago Developers', en: 'Mercado Pago Developers'},
      title: {es: 'Certificación Checkout Pro (Implementación de la plataforma de pagos)',
      en: 'Checkout Pro Certification (Implementation of the payment platform)'},
      link: 'https://www.mercadopago.com.ar/developers/panel/certification/cert_2d80b33ab42411ec95730242ac130004'
    },
  ];

  englishLevel: Education ={
      title: {es: 'Nivel de ingles', en: 'English level'},
      icon: 'fas fa-flag',
      school: {es: 'B1 / B2 Pre intermedio', en: 'B1 / B2 Pre intermediate'},
      subtitle: {es: 'Actualmente cursando', en: 'Currently studying'},

  };
  language$: Observable<string> = this.languageSelectorService.getLanguage();
  constructor(
    private languageSelectorService: LanguageSelectorService
  ) { }

  ngOnInit(): void {
  }

}
