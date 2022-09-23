import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Grid } from 'src/app/models/grid.interface';
import { LanguageSelectorService } from 'src/app/services/language-selector.service';

@Component({
  selector: 'jdv-works',
  templateUrl: './works.component.html',
  styleUrls: ['./works.component.scss']
})
export class WorksComponent implements OnInit {

  gridItems: Grid[] = [
    {
      title: {es: 'Belsport', en: 'Belsport'},
      paragraph: {es:'Participe en el proyecto en la customización del look and feel de la página, implementación de Apis externas, SEO con google analitycs, diseño responsivo para la correcta visualización en diferentes dispositivos, utilización de carga perezosa de componentes y modulos, implementación de scroll infinito administrable, optimización de performance.',
    en: 'I participate in the project in the customization of the look and feel of the page, implementation of external Apis, SEO with google analytics, responsive design for correct display on different devices, use of lazy loading of components and modules, implementation of manageable infinite scroll, performance optimization.'},
      imageUrl: '../../../../assets/projects-images/belsport-desktop.webp',
      reverse: false
    },
    {
      title: {es: 'Bamers', en: 'Bamers'},
      paragraph: {es:'Desarrollo de grids personalizados y administrable, SEO, adaptable a distintos dispositivos, mantenimiento, estimación de nuevos requisitos del front-end, páginas estáticas y administrables.',
    en: 'Development of custom and manageable grids, SEO, adaptable to different devices, maintenance, estimation of new front-end requirements, static and manageable pages.'},
      imageUrl: '../../../../assets/projects-images/bamers-desktop.webp',
      reverse: true
    },
    {
      title: {es: 'Antihuman', en: 'Antihuman'},
      paragraph: {es: 'Implementación de carruseles de productos recomendados, customización del look and feel, diseño orientado a la marca, adaptable a distintos dispositivos, optimización de performance y SEO.',
    en: 'Implementation of carousels of recommended products, customization of look and feel, brand-oriented design, adaptable to different devices, performance optimization and SEO.'},
      imageUrl: '../../../../assets/projects-images/antihuman-desktop.webp',
      reverse: false
    },
    {
      title: {es: 'Aufbau', en: 'Aufbau'},
      paragraph: {es: 'Personalización de rutas, implementación de modales dinámicos, administración de promociones en los productos, visualización y personalización segun resolución de dispositivos, activación de campañas, seguimiento de actividades de navegación de usuarios en las distintas rutas del sitio.',
    en: 'Customization of routes, implementation of dynamic modals, administration of product promotions, visualization and personalization according to device resolution, activation of campaigns, monitoring of user browsing activities in the different routes of the site.'},
      imageUrl: '../../../../assets/projects-images/aufbau-desktop.webp',
      reverse: true
    },
    {
      title: {es: 'Bold', en: 'Bold'},
      paragraph: {es:'Implementación de formularios reactivos con distintas funcionalidades, login de usuario, registro, implementación y customización de plataformas de pago en el checkout de la aplicación, activación de compras para usuarios invitados.',
    en: 'Implementation of reactive forms with different functionalities, user login, registration, implementation and customization of payment platforms in the application checkout, activation of purchases for guest users.'},
      imageUrl: '../../../../assets/projects-images/bold-desktop.webp',
      reverse: false
    },
    {
      title: {es: 'K-one', en: 'K-one'},
      paragraph: {es: 'Personalización de toda la visual del sitio, mejoras en la landing page principal, customización de resultados de búsqueda, mejoras en la visualización del checkout del sitio para dispositivos mobiles.',
    en: 'Customization of the entire visual of the site, improvements in the main landing page, customization of search results, improvements in the visualization of the checkout of the site for mobile devices.'},
      imageUrl: '../../../../assets/projects-images/kone-desktop.webp',
      reverse: true
    },
    {
      title: {es: 'Crocs', en: 'Crocs'},
      paragraph: {es:'Estimación de nuevos requerimientos a nivel de front-end, customización general del sitio y visualización del header, implementación de Google analytics.',
    en: 'Estimation of new requirements at the front-end level, general customization of the site and header display, implementation of Google analytics.'},
      imageUrl: '../../../../assets/projects-images/crocs-desktop.webp',
      reverse: false
    },
    {
      title: {es: 'Tupemesa', en: 'Tupemesa'},
      paragraph: {es:'Customización de vista 360 para asesor comercial del sitio, SEO, implementación de Google analytics.',
      en: 'Customization of 360 view for commercial advisor of the site, SEO, implementation of Google analytics.'},
      imageUrl: '../../../../assets/projects-images/tupemesa-desktop.webp',
      reverse: true
    },
    {
      title: {es: 'Promesa', en: 'Promesa'},
      paragraph: {es: 'Analisis de requerimientos del front-end, implementación de Google Recaptcha para registro de usuarios, desarrollo general del front-end con principios responsive para la correcta visualización en todo el sitio, conección con la API de twilio para la devolución de PIN de activación en los celulares de los usuarios, comercio eléctronico B2B.',
    en: 'Analysis of front-end requirements, implementation of Google Recaptcha for user registration, general development of the front-end with responsive principles for the correct display throughout the site, connection with the twilio API for the return of activation PIN in the cell phones of users, B2B electronic commerce.'},
      imageUrl: '../../../../assets/projects-images/promesa-desktop.webp',
      reverse: false
    }
  ];

  language$: Observable<string> = this.languageSelectorService.getLanguage();

  constructor(private languageSelectorService: LanguageSelectorService) { }

  ngOnInit(): void {
  }

}
