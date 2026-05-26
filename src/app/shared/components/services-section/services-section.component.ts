import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { BreakpointService } from '../../../services/breakpoint.service';
import { Observable } from 'rxjs';
import { Language } from '../../../models/language.interface';
import { Service } from '../../../models/services.interface';
import { LanguageSelectorService } from 'src/app/services/language-selector.service';

@Component({
  selector: 'jdv-services-section',
  templateUrl: './services-section.component.html',
  styleUrls: ['./services-section.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ServicesSectionComponent implements OnInit {
  serviceTitle: Language = { es: 'Áreas de Expertise', en: 'Areas of Expertise' };
  serviceIntro: Language = {
    es: 'Aporto valor a los equipos de producto combinando arquitectura sólida, metodologías ágiles y las mejores prácticas de la industria para construir software escalable. Me enfoco en resolver problemas complejos de negocio mediante tecnología moderna, siempre priorizando el rendimiento, la accesibilidad y la experiencia de usuario.',
    en: 'I bring value to product teams by combining solid architecture, agile methodologies, and industry best practices to build scalable software. I focus on solving complex business problems through modern technology, always prioritizing performance, accessibility, and user experience.',
  };
  services: Service[] = [
    {
      title: {
        es: 'Frontend Architecture',
        en: 'Frontend Architecture',
      },
      imgUrl: '../../../../assets/images/web.webp',
      text: {
        es: 'Diseño y desarrollo de interfaces escalables y de alto rendimiento, optimizando el estado global y asegurando código mantenible a largo plazo.',
        en: 'Design and development of highly scalable and performant interfaces, optimizing global state and ensuring long-term maintainable code.',
      },
    },
    {
      title: { es: 'E-commerce Enterprise', en: 'E-commerce Enterprise' },
      imgUrl: '../../../../assets/images/commerce.webp',
      text: {
        es: 'Experiencia profunda en SAP Spartacus y plataformas transaccionales de alto volumen con integraciones de pasarelas de pago.',
        en: 'Deep expertise in SAP Spartacus and high-volume transactional platforms with seamless payment gateway integrations.',
      },
    },
    {
      title: { es: 'Liderazgo Técnico', en: 'Technical Leadership' },
      imgUrl: '../../../../assets/images/team.webp',
      text: {
        es: 'Gestión técnica de equipos en entornos ágiles, code reviews y mentoría para garantizar los más altos estándares de calidad de software.',
        en: 'Technical team management in agile environments, conducting code reviews, and providing mentorship to ensure the highest software quality standards.',
      },
    },
    {
      title: { es: 'Optimización y SEO', en: 'Optimization & SEO' },
      imgUrl: '../../../../assets/images/rocket.webp',
      text: {
        es: 'Implementación de Server-Side Rendering (SSR) y mejores prácticas Core Web Vitals para maximizar el posicionamiento y rendimiento.',
        en: 'Implementation of Server-Side Rendering (SSR) and Core Web Vitals best practices to maximize positioning and performance.',
      },
    },
    {
      title: { es: 'Integración Fullstack', en: 'Fullstack Integration' },
      imgUrl: '../../../../assets/images/database.webp',
      text: {
        es: 'Diseño de arquitecturas completas conectando el frontend con bases de datos relacionales y no relacionales mediante APIs robustas.',
        en: 'Designing end-to-end architectures connecting the frontend with relational and non-relational databases through robust APIs.',
      },
    },
    {
      title: { es: 'De Concepto a Producción', en: 'Concept to Production' },
      imgUrl: '../../../../assets/images/idea.webp',
      text: {
        es: 'Análisis de viabilidad, diseño de arquitectura y liderazgo técnico continuo desde la concepción del producto hasta su despliegue exitoso.',
        en: 'Feasibility analysis, architecture design, and continuous technical leadership from product conception to successful deployment.',
      },
    },
    {
      title: { es: 'Seguridad y Calidad', en: 'Security & Quality' },
      imgUrl: '../../../../assets/images/security.webp',
      text: {
        es: 'Foco transversal en la seguridad, autenticación (ej. Next-Auth) y cobertura de pruebas para mitigar riesgos en entornos de producción.',
        en: 'Transversal focus on security, authentication (e.g. Next-Auth), and test coverage to mitigate risks in production environments.',
      },
    },
    {
      title: { es: 'Flujos de IA', en: 'AI Workflows' },
      imgUrl: '../../../../assets/images/achievement.webp',
      text: {
        es: 'Integración de agentes autónomos y copilots en el ciclo de desarrollo para acelerar entregas sin comprometer la arquitectura y legibilidad.',
        en: 'Integration of autonomous agents and copilots in the development cycle to accelerate delivery without compromising architecture and readability.',
      },
    },
  ];

  isMobile$: Observable<boolean> = this.breakpointService.isMobile$;
  language$: Observable<string> = this.languageSelectorService.getLanguage();
  constructor(
    private breakpointService: BreakpointService,
    private languageSelectorService: LanguageSelectorService
  ) {}

  ngOnInit(): void {}
}
