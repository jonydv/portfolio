import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Language } from 'src/app/models/language.interface';
import { LanguageSelectorService } from 'src/app/services/language-selector.service';
import { Experience } from '../../../models/experience.interface';

@Component({
  selector: 'jdv-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.scss'],
})
export class ExperienceComponent implements OnInit {
  title: Language = { es: 'Experiencia', en: 'Experience' };
  positions: Experience[] = [
    {
      icon: 'fas fa-code',
      company: { es: 'Qubik Digital', en: 'Qubik Digital' },
      period: {
        es: '(Período: 2021 - Actualidad)',
        en: '(Period: 2021 - Currently)',
      },
      role: {
        en: 'Front End Developer (Angular / Spartacus Sap Commerce)',
        es: 'Front End Developer (Angular / Spartacus Sap Commerce)',
      },
      description: {
        es: `Desarrollo del front-end mediante el framework Angular, implementación y customización
      de Spartacus acelerador de SAP Commerce, sitios E-commerce B2B y B2C, trabajo en equipo, code review,
      con metodologias agiles, estimación de requisitos, planning, control de versiones mediante
      GIT, utilización de RxJS, Typescript, HTML5, SCSS, implementación de todo tipo de diseños UX / UI,
      utilizando tanto el enfoque responsive como mobile first, teniendo en cuenta siempre la accesibilidad,
      buenas practicas de desarrollo, y la performance de los sitios, implementación de herramientas SEO para
      el posicionamiento, etc.`,
        en: `Front-end development using the Angular framework, implementation and customization of the SAP Commerce accelerator Spartacus, B2B and B2C e-commerce sites, teamwork, code review, using agile methodologies, requirement estimation, planning, version control using GIT, use of RxJS, Typescript, HTML5, SCSS, implementation of all types of UX/UI designs, using both the responsive and mobile-first approach, always considering accessibility, good development practices, and site performance, implementation of SEO tools for positioning, etc.`,
      },
    },
    {
      icon: 'fas fa-code',
      company: { es: 'Onikom Latam', en: 'Onikom Latam' },
      period: {
        es: '(Período: Febrero 2023 - Julio 2023)',
        en: '(Period: February 2023 - July 2023)',
      },
      role: {
        en: 'Solution Architect Front End (Angular / Spartacus Sap Commerce)',
        es: 'Arquitecto de solución Front End (Angular / Spartacus Sap Commerce)',
      },
      description: {
        es: `Durante mi tiempo como Arquitecto de Solución Front-end en Onikom, lideré una importante migración del sistema de comercio electrónico de un cliente externo de la empresa, desde SAP Spartacus 1.5 y Angular 8 hasta la versión Sap Spartacus 4.3 y Angular 12.Mis responsabilidades y logros incluyeron:
        Lideré y coordiné la migración de SAP Spartacus 1 a SAP Spartacus 4.3, lo que implicó una extensa planificación, la gestión de diversas partes interesadas y la resolución de desafíos técnicos complejos.
        Diseñé y desarrollé la estrategia de migración del e-commerce con un equipo interdisciplinario, garantizando una transición fluida con interrupciones mínimas para los usuarios y operaciones del negocio.
        Trabajé estrechamente con los desarrolladores y el equipo de operaciones para implementar y optimizar las nuevas funcionalidades proporcionadas por Spartacus 4.3, mejorando la experiencia del usuario final y la eficiencia operativa.
        Proporcioné formación continua al equipo de desarrollo sobre las mejores prácticas y estándares de SAP Spartacus para garantizar un uso y mantenimiento eficaces del sistema.
        Gracias a la estrategia de migración y planificación implementadas, se logró una mejora significativa en la experiencia de usuario, accesibilidad y seguridad del sistema de comercio electrónico.
        Estas habilidades y experiencias han sido valiosas para desarrollar mi competencia en la arquitectura de soluciones front-end en Sap Spartacus con Angular`,
        en: `During my time as a Front-end Solution Architect at Onikom, I led a significant migration of a client's e-commerce system from SAP Spartacus 1.5 and Angular 8 to SAP Spartacus 4.3 and Angular 12.
        My responsibilities and achievements included:
        I led and coordinated the migration from SAP Spartacus 1 to SAP Spartacus 4.3, which involved extensive planning, stakeholder management, and the resolution of complex technical challenges.
        I designed and developed the e-commerce migration strategy with an interdisciplinary team, ensuring a smooth transition with minimal disruptions for users and business operations.
        I worked closely with developers and the operations team to implement and optimize the new features provided by Spartacus 4.3, improving the end user experience and operational efficiency.
        I provided ongoing training to the development team on SAP Spartacus best practices and standards to ensure effective use and maintenance of the system.
        Thanks to the implemented migration strategy and planning, we achieved a significant improvement in user experience, accessibility, and security of the e-commerce system.
        These skills and experiences have been valuable in developing my competence in front-end solution architecture using SAP Spartacus with Angular.`,
      },
    },
    {
      icon: 'fas fa-code',
      company: { es: 'Desarrollador Freelance', en: 'Freelance Developer' },
      period: { es: '(Período: 2019 - 2021)', en: '(Period: 2019 - 2021)' },
      role: {
        es: 'Full Stack Developer (MERN & MEAN Stack)',
        en: 'Full Stack Developer (MERN & MEAN Stack)',
      },
      description: {
        es: `Desarrollo de aplicaciones web, tanto del lado del servidor como del lado del cliente, utilización de
      los frameworks Javascript más robustos y populares, diseño e implementación de bases de datos relacionales
      y no relacionales (SQL Server, MySql, MongoDb, Postgre), back-end desarrollados en NodeJs con ExpressJs utilizando
      Javascript y también Typescript, desarrollo del front-end utilizando ReactJs con Typescript, Redux, Context Api, también
      utilizando el framework Angular con RxJs, Typescript, NgRX, HTML5, CSS, SCSS, Bootstrap, Angular Material, etc.
      Implementación de Apis externas como plataformas de pago, MercadoPago, WebPay. SEO mediante la implementación de herramientas
      de Google Analytics, Retail Rocket para recomendación mediante IA según la recopilación de datos del usuario, etc.`,
        en: `Development of web applications, both on the server side and on the client side, using the most robust and popular Javascript frameworks, design and implementation of relational and non-relational databases (SQL Server, MySql, MongoDb, Postgre), back-end developed in NodeJs with ExpressJs using Javascript and also Typescript, front-end development using ReactJs with Typescript, Redux, Context Api, also using the Angular framework with RxJs, Typescript, NgRX, HTML5, CSS, SCSS, Bootstrap, Angular Material, etc. Implementation of external Apis such as payment platforms, MercadoPago, WebPay. SEO through the implementation of tools such as Google Analytics, Retail Rocket for recommendation through AI based on user data collection, etc.`,
      },
    },
  ];

  language$: Observable<string> = this.languageSelectorService.getLanguage();
  constructor(private languageSelectorService: LanguageSelectorService) {}

  ngOnInit(): void {}
}
