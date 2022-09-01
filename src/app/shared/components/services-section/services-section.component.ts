import { Component, OnInit } from '@angular/core';
import { BreakpointService } from '../../../services/breakpoint.service';
import { Observable } from 'rxjs';
import { Language } from '../../../models/language.interface';
import { Service } from '../../../models/services.interface';
import { LanguageSelectorService } from 'src/app/services/language-selector.service';

@Component({
  selector: 'jdv-services-section',
  templateUrl: './services-section.component.html',
  styleUrls: ['./services-section.component.scss']
})
export class ServicesSectionComponent implements OnInit {

  serviceTitle: Language= {es: 'Servicios', en: 'Services'};
  serviceIntro: Language = {es: 'Realizo soluciones a medida porque cada empresa tiene particularidades y necesidades únicas. Trabajando en equipo, relevamos, estudiamos y ajustamos las herramientas para que se adapten a lo que buscas: crear un sitio web, abrir una tienda online, posicionar tu marca en Google, aumentar el rendimiento de tu sitio, incluir mejoras, nuevas funcionalidades, manteniendo los mejores estandares de la industria.',
  en: 'I make customized solutions because each company has unique characteristics and needs. Working as a team, we review, study and adjust the tools so that they adapt to what you are looking for: create a website, open an online store, position your brand on Google, increase the performance of your site, include improvements, new features, maintaining the best industry standards.'};
  services: Service[] = [
    {
      title: {
        es: 'Desarrollo Web',
        en: 'Web Development'
    },
      imgUrl: '../../../../assets/images/web.png',
      text: {es: 'Desarrollo de sitios web responsive para la mejor experiencia de usuario, adaptable a distintos dispositivos y cada uno con su propia identidad.',
      en: 'Development of responsive websites for the best user experience, adaptable to different devices and each with its own identity.'}
    },
    {
      title: {es: 'Comercio electrónico', en: 'E-commerce'},
      imgUrl: '../../../../assets/images/commerce.png',
      text: {es:'Sitios e-commerce administrables y con la implementación de plataformas de pago.',
      en: 'Manageable e-commerce sites and with the implementation of payment platforms.'}
    },
    {
      title: {es: 'Trabajo en equipo', en: 'Teamwork'},
      imgUrl: '../../../../assets/images/team.png',
      text: {es: 'Trabajo en equipo con metodologias agiles para conseguir los objetivos o prototipos del software que su empresa necesita, mediante desarrollo iterativo e incremental.',
      en: 'Teamwork with agile methodologies to achieve the objectives or prototypes of the software that your company needs, through iterative and incremental development.'}
    },
    {
      title: {es: 'Posicionamiento', en:'Positioning'},
      imgUrl: '../../../../assets/images/rocket.png',
      text: {es: 'Integración de las aplicaciones web con las mejores herramientas para el posicionamiento de su sitio, teniendo en cuenta las mejores prácticas para SEO.',
      en: 'Integration of web applications with the best tools for positioning your site, taking into account the best practices for SEO.'}
    },
    {
      title: {es: 'Bases de datos', en: 'Databases'},
      imgUrl: '../../../../assets/images/database.png',
      text: {es: 'Dependiendo de las necesidades del software, desarrollamos con bases de datos relacionales y no relacionales, siguiendo los estandares de seguridad.',
      en: 'Depending on the needs of the software, we develop with relational and non-relational databases, following the security standards.'}
    },
    {
      title: {es: 'Ideas', en: 'Ideas'},
      imgUrl: '../../../../assets/images/idea.png',
      text: {es: 'Tenés una idea, podemos analizar la factibilidad de desarrollar un software que la satisfaga.',
      en: 'You have an idea, we can analyze the feasibility of developing software that satisfies it.'}
    },
    {
      title: {es: 'Seguridad', en: 'Security'},
      imgUrl: '../../../../assets/images/security.png',
      text: { es: 'A la hora de iniciar un proyecto se tiene en cuenta la seguridad del software desde el analisis inicial hasta la implementación.',
    en: 'When starting a project, software security is taken into account from the initial analysis to implementation.'}
    },
    {
      title: {es: 'Crecimiento', en: 'Growth'},
      imgUrl: '../../../../assets/images/achievement.png',
      text: {es: 'Las metas de tu organización son importantes, y las tenemos en cuenta a la hora de empezar un proyecto para poder ayudarte a cumplirlas.',
      en: 'The goals of your organization are important, and we take them into account when starting a project in order to help you meet them.'}
    },
  ];

  isMobile$: Observable<boolean> = this.breakpointService.isMobile$;
  language$: Observable<string> = this.languageSelectorService.getLanguage();
  constructor(
    private breakpointService: BreakpointService,
    private languageSelectorService: LanguageSelectorService
  ) { }

  ngOnInit(): void {
  }

}
