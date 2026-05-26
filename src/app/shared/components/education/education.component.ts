import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef } from '@angular/core';
import { Observable } from 'rxjs';
import { Language } from 'src/app/models/language.interface';
import { LanguageSelectorService } from 'src/app/services/language-selector.service';
import { Education } from '../../../models/education.interface';

@Component({
  selector: 'jdv-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EducationComponent implements AfterViewInit {
  title: Language = { es: 'Educación', en: 'Education' };
  viewCertificate: Language = {
    es: 'Ver Certificado en linea',
    en: 'View Online Certificate',
  };
  courses: Education[] = [
    {
      icon: 'fas fa-university',
      school: {
        es: 'Universidad Nacional De José C. Paz',
        en: 'National University Of José C. Paz',
      },
      title: {
        es: 'Licenciatura en gestión de tecnologías de la información (Cursando actualmente)',
        en: "Bachelor's Degree in Information Technology Management (Currently studying)",
      },
      subtitle: {
        es: 'Analista de sistemas (Título de pregrado)',
        en: 'Systems Analyst',
      },
    },
    {
      icon: 'fas fa-robot',
      school: { es: 'Anthropic', en: 'Anthropic' },
      title: {
        es: 'Claude 101 (Abril 2026)',
        en: 'Claude 101 (April 2026)',
      },
    },
    {
      icon: 'fas fa-robot',
      school: { es: 'Anthropic', en: 'Anthropic' },
      title: {
        es: 'Claude Code in Action (Marzo 2026)',
        en: 'Claude Code in Action (March 2026)',
      },
    },
    {
      icon: 'fas fa-robot',
      school: { es: 'Anthropic', en: 'Anthropic' },
      title: {
        es: 'Introduction to Agent Skills (Marzo 2026)',
        en: 'Introduction to Agent Skills (March 2026)',
      },
    },
    {
      icon: 'fas fa-university',
      school: { es: 'Universidad Austral', en: 'Austral University' },
      title: {
        es: 'Desarrollo del lado servidor: Node.js, Express y MongoDB',
        en: 'Server-side development: Node.js, Express and MongoDB',
      },
      link: 'https://www.coursera.org/account/accomplishments/certificate/VHFUMEB7WBXN',
    },
    {
      icon: 'fas fa-university',
      school: { es: 'Mercado Pago Developers', en: 'Mercado Pago Developers' },
      title: {
        es: 'Certificación Checkout Pro (Implementación de la plataforma de pagos)',
        en: 'Checkout Pro Certification (Implementation of the payment platform)',
      },
      link: 'https://www.mercadopago.com.ar/developers/panel/certification/cert_2d80b33ab42411ec95730242ac130004',
    },
    {
      icon: 'fas fa-university',
      school: {
        es: 'Angular Intermedio (HackerRank)',
        en: 'Angular Intermediate (HackerRank)',
      },
      title: {
        es: 'Certificación Angular intermedio (Apis, inyección de dependencias, modulos, ruteo, observables, programación reactiva, transmisión y manejo de eventos)',
        en: 'Angular Intermediate Certificate (Apis, dependency injections, modules, routing, observables, data transmission and event handling)',
      },
      link: 'https://www.hackerrank.com/certificates/435d6f395e81',
    },
    {
      icon: 'fas fa-university',
      school: {
        es: 'Angular Básico (HackerRank)',
        en: 'Angular Basic (HackerRank)',
      },
      title: {
        es: 'Certificación Angular básico (Bibliotecas MVC, componentes, estilizado dinámico, typescript, enlace de datos bidireccional, validación de formularios)',
        en: 'Angular Basic Certificate (MVC frameworks, components, dynamic styling, typescript, two way data binding, form validation)',
      },
      link: 'https://www.hackerrank.com/certificates/f26b96c24b52',
    },
  ];

  englishLevel: Education = {
    title: { es: 'Nivel de inglés', en: 'English level' },
    icon: 'fas fa-flag',
    school: { es: 'B1/B2 Pre-Intermedio', en: 'B1/B2 Pre-Intermediate' },
    subtitle: { es: 'Actualmente cursando', en: 'Currently studying' },
  };
  language$: Observable<string> = this.languageSelectorService.getLanguage();

  constructor(
    private languageSelectorService: LanguageSelectorService,
    private el: ElementRef
  ) {}

  ngAfterViewInit(): void {
    const container: HTMLElement = this.el.nativeElement.querySelector('.education__info');
    if (container) {
      setTimeout(() => container.classList.add('animate__animated'), 50);
    }
  }
}
