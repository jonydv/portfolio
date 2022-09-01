import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Language } from 'src/app/models/language.interface';
import { LanguageSelectorService } from 'src/app/services/language-selector.service';
import { Experience } from '../../../models/experience.interface';

@Component({
  selector: 'jdv-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.scss']
})
export class ExperienceComponent implements OnInit {

  title: Language = {es: 'Experiencia', en: 'Experience'};
  positions: Experience[] = [
    {
      icon: 'fas fa-code',
      company: {es: 'Qubik Digital', en: 'Qubik Digital'},
      period: {es: '(Período: 2021 - Actualidad)', en: '(Period: 2021 - Currently)'},
      role: {en: 'Front End Developer (Angular / Spartacus Sap Commerce)', es: 'Front End Developer (Angular / Spartacus Sap Commerce)'},
      description: {es:`Desarrollo del front-end mediante el framework Angular, implementación y customización
      de Spartacus acelerador de SAP Commerce, sitios E-commerce B2B y B2C, trabajo en equipo, code review,
      con metodologias agiles, estimación de requisitos, planning, control de versiones mediante
      GIT, utilización de RxJS, Typescript, HTML5, SCSS, implementación de todo tipo de diseños UX / UI,
      utilizando tanto el enfoque responsive como mobile first, teniendo en cuenta siempre la accesibilidad,
      buenas practicas de desarrollo, y la performance de los sitios, implementación de herramientas SEO para
      el posicionamiento, etc.`,
      en: `Front-end development using the Angular framework, implementation and customization
      from Spartacus SAP Commerce accelerator, B2B and B2C E-commerce sites, teamwork, code review,
      with agile methodologies, estimation of requirements, planning, version control through
      GIT, use of RxJS, Typescript, HTML5, SCSS, implementation of all kinds of UX / UI designs,
      using both the responsive and mobile first approach, always keeping accessibility in mind,
      good development practices, and the performance of the sites, implementation of SEO tools for
      positioning etc`},
    },
    {
      icon: 'fas fa-code',
      company: {es: 'Desarrollador Freelance', en: 'Freelance Developer'},
      period: {es: '(Período: 2019 - 2021)', en: '(Period: 2019 - 2021)'},
      role: {es: 'Full Stack Developer (MERN & MEAN Stack)', en: 'Full Stack Developer (MERN & MEAN Stack)'},
      description: {es: `Desarrollo de aplicaciones web, tanto del lado del servidor como del lado del cliente, utilización de
      los frameworks Javascript más robustos y populares, diseño e implementación de bases de datos relacionales
      y no relacionales (SQL Server, MySql, MongoDb, Postgre), back-end desarrollados en NodeJs con ExpressJs utilizando
      Javascript y también Typescript, desarrollo del front-end utilizando ReactJs con Typescript, Redux, Context Api, también
      utilizando el framework Angular con RxJs, Typescript, NgRX, HTML5, CSS, SCSS, Bootstrap, Angular Material, etc.
      Implementación de Apis externas como plataformas de pago, MercadoPago, WebPay. SEO mediante la implementación de herramientas
      de Google Analytics, Retail Rocket para recomendación mediante IA según la recopilación de datos del usuario, etc.`,
    en: `Development of web applications, both on the server side and on the client side, use of
    the most robust and popular Javascript frameworks, design and implementation of relational databases
    and non-relational (SQL Server, MySql, MongoDb, Postgre), back-end developed in NodeJs with ExpressJs using
    Javascript and also Typescript, front-end development using ReactJs with Typescript, Redux, Context Api, also
    using the Angular framework with RxJs, Typescript, NgRX, HTML5, CSS, SCSS, Bootstrap, Angular Material, etc.
    Implementation of external APIs such as payment platforms, MercadoPago, WebPay. SEO by implementing tools
    Google Analytics, Retail Rocket for AI recommendation based on user data collection, etc.`}
    }
  ];

  language$: Observable<string> = this.languageSelectorService.getLanguage();
  constructor(
    private languageSelectorService: LanguageSelectorService
  ) { }

  ngOnInit(): void {
  }

}
