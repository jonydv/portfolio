import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Grid } from 'src/app/models/grid.interface';
import { LanguageSelectorService } from 'src/app/services/language-selector.service';

@Component({
  selector: 'jdv-works',
  templateUrl: './works.component.html',
  styleUrls: ['./works.component.scss'],
})
export class WorksComponent implements OnInit {
  gridItems: Grid[] = [
    {
      title: { es: 'Marchand', en: 'Marchand' },
      paragraph: {
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
      imageUrl: '../../../../assets/projects-images/marchand.webp',
      reverse: false,
      link: 'https://www.marchand.com.mx/',
    },
    {
      title: { es: 'Promesa', en: 'Promesa' },
      paragraph: {
        es: 'Analisis de requerimientos del front-end, implementación de Google Recaptcha para registro de usuarios, desarrollo general del front-end con principios responsive para la correcta visualización en todo el sitio, conección con la API de twilio para la devolución de PIN de activación en los celulares de los usuarios, comercio eléctronico B2B.',
        en: 'Analysis of front-end requirements, implementation of Google Recaptcha for user registration, general front-end development with responsive principles for correct display throughout the site, connection with the Twilio API for returning activation PINs to users cellphones, B2B e-commerce.',
      },
      imageUrl: '../../../../assets/projects-images/promesa-desktop.webp',
      reverse: true,
      link: 'https://www.promesa.com.ec/',
    },
    {
      title: { es: 'Spartacus Demo', en: 'JDV Spartacus Demo' },
      paragraph: {
        es: 'He creado este proyecto desde cero utilizando el framework Angular y el acelerador Sap Spartacus/Sap Composable Storefront en su versión 4.x. El objetivo de este proyecto es servir como inducción a la tecnología del acelerador para un equipo de trabajo que se encuentra dando sus primeros pasos en este ámbito. En este proyecto se pueden observar diversas personalizaciones de componentes y la estilización de la interfaz de usuario, todo ello con el fin de asemejarla a un e-commerce referente en Argentina y América Latina. Además, he implementado el Server Side Rendering utilizando Angular Universal y las metodologías utilizadas por Spartacus.        Este proyecto incluye también la implementación de modales, personalización de los flujos de listado de productos, página de detalle de productos, buscador y mucho más.',
        en: 'I have created this project from scratch using the Angular framework and the Sap Spartacus/Sap Composable Storefront accelerator in version 4.x. The objective of this project is to serve as an introduction to the accelerator technology for a team that is taking its first steps in this field. This project showcases various component customizations and user interface styling aimed at resembling a leading e-commerce site in Argentina and Latin America. Additionally, I have implemented Server Side Rendering using Angular Universal and the methodologies used by Spartacus. This project also includes the implementation of modals, customization of product listing flows, product detail page, search engine, and much more',
      },
      imageUrl: '../../../../assets/projects-images/spartacus-demo.webp',
      reverse: false,
      link: 'https://jdv-spartacus.netlify.app/',
    },
    {
      title: { es: 'JDVM Movie', en: 'JDVM Movie' },
      paragraph: {
        es: 'Este proyecto lo he creado desde cero utilizando la última versión del framework Angular y la API de TheMovieDB. Implementé carga perezosa y renderizado del lado del servidor para lograr un mejor rendimiento y una optimización del SEO. En esta aplicación, se pueden encontrar filtros avanzados, meta-resolvers para cargar datos de manera anticipada, búsquedas mediante queries, scroll infinito para una mejor experiencia del usuario, rutas dinámicas y la implementación de la API de YouTube para la visualización de trailers de películas. Además, cuenta con un diseño responsivo y muchas otras características.',
        en: 'I created this project from scratch using the latest version of the Angular framework and TheMovieDB API. I implemented lazy loading and server-side rendering to achieve better performance and SEO optimization. This application features advanced filters, meta-resolvers for preloading data, query-based searching, infinite scrolling for a better user experience, dynamic routes, and implementation of the YouTube API for viewing movie trailers. It also has a responsive design and many other features.',
      },
      imageUrl: '../../../../assets/projects-images/movie-desktop.webp',
      reverse: true,
      link: 'https://jdvmovies.netlify.app/',
    },
    {
      title: { es: 'Belsport', en: 'Belsport' },
      paragraph: {
        es: 'Participe en el proyecto en la customización del look and feel de la página, implementación de Apis externas, SEO con google analitycs, diseño responsivo para la correcta visualización en diferentes dispositivos, utilización de carga perezosa de componentes y modulos, implementación de scroll infinito administrable, optimización de performance.',
        en: 'I participated in the project in customizing the look and feel of the page, implementing external APIs, SEO with google analytics, responsive design for correct visualization on different devices, using lazy loading of components and modules, implementing manageable infinite scroll, performance optimization.',
      },
      imageUrl: '../../../../assets/projects-images/belsport-desktop.webp',
      reverse: false,
      link: 'https://belsport.cl/',
    },
    {
      title: { es: 'Bamers', en: 'Bamers' },
      paragraph: {
        es: 'Desarrollo de grids personalizados y administrable, SEO, adaptable a distintos dispositivos, mantenimiento, estimación de nuevos requisitos del front-end, páginas estáticas y administrables.',
        en: 'Development of custom and manageable grids, SEO, adaptable to different devices, maintenance, estimation of new front-end requirements, static and manageable pages.',
      },
      imageUrl: '../../../../assets/projects-images/bamers-desktop.webp',
      reverse: true,
      link: 'https://bamers.cl/',
    },
    {
      title: { es: 'Antihuman', en: 'Antihuman' },
      paragraph: {
        es: 'Implementación de carruseles de productos recomendados, customización del look and feel, diseño orientado a la marca, adaptable a distintos dispositivos, optimización de performance y SEO.',
        en: 'Development of custom and manageable product carousels, customization of look and feel, brand-oriented design, adaptable to different devices, performance optimization and SEO.',
      },
      imageUrl: '../../../../assets/projects-images/antihuman-desktop.webp',
      reverse: false,
      link: 'https://www.antihuman.cl/',
    },
    {
      title: { es: 'Aufbau', en: 'Aufbau' },
      paragraph: {
        es: 'Personalización de rutas, implementación de modales dinámicos, administración de promociones en los productos, visualización y personalización segun resolución de dispositivos, activación de campañas, seguimiento de actividades de navegación de usuarios en las distintas rutas del sitio.',
        en: 'Customization of routes, implementation of dynamic modals, management of product promotions, visualization and customization according to device resolution, activation of campaigns, tracking of user navigation activities on different site routes.',
      },
      imageUrl: '../../../../assets/projects-images/aufbau-desktop.webp',
      reverse: true,
      link: 'https://aufbau.cl/',
    },
    {
      title: { es: 'Bold', en: 'Bold' },
      paragraph: {
        es: 'Implementación de formularios reactivos con distintas funcionalidades, login de usuario, registro, implementación y customización de plataformas de pago en el checkout de la aplicación, activación de compras para usuarios invitados.',
        en: 'Implementation of reactive forms with various functionalities, user login, registration, implementation and customization of payment platforms in the application checkout, activation of purchases for guest users.',
      },
      imageUrl: '../../../../assets/projects-images/bold-desktop.webp',
      reverse: false,
      link: 'https://bold.cl/',
    },
    {
      title: { es: 'K-one', en: 'K-one' },
      paragraph: {
        es: 'Personalización de toda la visual del sitio, mejoras en la landing page principal, customización de resultados de búsqueda, mejoras en la visualización del checkout del sitio para dispositivos mobiles.',
        en: 'Customization of the entire websites visual, improvements in the main landing page, customization of search results, improvements in the checkout pages display for mobile devices.',
      },
      imageUrl: '../../../../assets/projects-images/kone-desktop.webp',
      reverse: true,
      link: 'https://k1.cl/',
    },
    {
      title: { es: 'Crocs', en: 'Crocs' },
      paragraph: {
        es: 'Estimación de nuevos requerimientos a nivel de front-end, customización general del sitio y visualización del header, implementación de Google analytics.',
        en: 'I estimate new front-end requirements, customize the overall look and feel of the site and display the header, and implement Google Analytics',
      },
      imageUrl: '../../../../assets/projects-images/crocs-desktop.webp',
      reverse: false,
      link: 'https://crocs.cl/',
    },
    {
      title: { es: 'Tupemesa', en: 'Tupemesa' },
      paragraph: {
        es: 'Customización de vista 360 para asesor comercial del sitio, SEO, implementación de Google analytics.',
        en: 'Customization of 360 view for the commercial advisor of the site, SEO, implementation of Google analytics.',
      },
      imageUrl: '../../../../assets/projects-images/tupemesa-desktop.webp',
      reverse: true,
      link: 'https://tienda.tupemesa.com.pe/',
    },
  ];

  language$: Observable<string> = this.languageSelectorService.getLanguage();

  constructor(private languageSelectorService: LanguageSelectorService) {}

  ngOnInit(): void {}
}
