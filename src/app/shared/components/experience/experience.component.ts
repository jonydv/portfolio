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
        en: 'Sr Front End Developer (Angular / Spartacus Sap Commerce / Next.js)',
        es: 'Sr Front End Developer (Angular / Spartacus Sap Commerce / Next.js)',
      },
      description: {
        es: `Desarrollo del front-end mediante el framework Angular, implementación y customización de Spartacus | Composable storefront para sitios E-commerce B2B y B2C. Además, destaco la arquitectura y construcción de bibliotecas reutilizables (tanto para SAP Spartacus como para proyectos en Next.js) alojadas en AWS CodeArtifact, con el fin de acelerar el desarrollo de nuevos proyectos desde el día uno aplicando las mejores prácticas de código. Implementación de estas librerías en múltiples proyectos de la compañía utilizando Tailwind CSS, Next-Auth, bibliotecas UI (como Hero-UI), TanStack, boilerplates rápidos, integración de librerías actuales de IA y flujos dinámicos de agentes. Todo bajo metodologías ágiles, code review, uso de RxJS, Typescript, y garantizando siempre la accesibilidad, performance, SEO y un enfoque mobile-first.`,
        en: `Front-end development using the Angular framework, implementation and customization of the SAP Commerce accelerator Spartacus | Composable storefront for B2B and B2C e-commerce sites. Additionally, I highlight the architecture and construction of reusable libraries (for both SAP Spartacus and Next.js projects) published via AWS CodeArtifact, aiming to accelerate the development of new projects from day one by applying code best practices. Implementation of these libraries across multiple company projects using Tailwind CSS, Next-Auth, UI libraries (such as Hero-UI), TanStack, fast boilerplates, integration of current AI libraries and dynamic agent workflows. All this under agile methodologies, code review, use of RxJS, Typescript, and always ensuring accessibility, performance, SEO, and a mobile-first approach.`,
      },
    },
    {
      icon: 'fas fa-code',
      company: { es: 'Onikom Latam', en: 'Onikom Latam' },
      period: {
        es: '(Período: Noviembre 2024 - Abril 2025)',
        en: '(Period: November 2024 - April 2025)',
      },
      role: {
        en: 'Solution Architect (Angular / Spartacus Sap Commerce)',
        es: 'Arquitecto de solución (Angular / Spartacus Sap Commerce)',
      },
      description: {
        es: `Como Arquitecto de Solución en el proyecto Marchand de México, diseñé y desarrollé un nuevo feature en Spartacus / SAP Composable Storefront para determinar dinámicamente la lista de precios según la ciudad del usuario mediante su código postal. El principal desafío consistió en implementar las actualizaciones necesarias y ejecutar complejas validaciones de negocio garantizando el rendimiento y las buenas prácticas, logrando desplegar exitosamente el feature en producción.`,
        en: `As a Solution Architect for the Marchand de Mexico project, I designed and developed a new feature in Spartacus / SAP Composable Storefront to dynamically determine the price list based on the user's city via their zip code. The main challenge was to implement the necessary updates and execute complex business validations while ensuring performance and best practices, successfully deploying the feature to production.`,
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
