import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef } from '@angular/core';
import { Observable } from 'rxjs';
import { Language } from 'src/app/models/language.interface';
import { LanguageSelectorService } from 'src/app/services/language-selector.service';
import { Experience } from '../../../models/experience.interface';

@Component({
  selector: 'jdv-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExperienceComponent implements AfterViewInit {
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
        es: `• Liderazgo técnico en desarrollo Frontend e implementación de SAP Spartacus para plataformas e-commerce B2B/B2C.
• Arquitectura y desarrollo de librerías reutilizables (Angular/Next.js) publicadas en AWS CodeArtifact, reduciendo el time-to-market de nuevos proyectos.
• Integración de tecnologías modernas: Tailwind CSS, Next-Auth, TanStack y flujos de agentes con IA.
• Foco continuo en accesibilidad, performance, SEO y metodologías ágiles.`,
        en: `• Technical leadership in Frontend development and SAP Spartacus implementation for B2B/B2C e-commerce platforms.
• Architected and developed reusable libraries (Angular/Next.js) published on AWS CodeArtifact, reducing time-to-market for new projects.
• Integration of modern technologies: Tailwind CSS, Next-Auth, TanStack, and AI agent workflows.
• Continuous focus on accessibility, performance, SEO, and agile methodologies.`,
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
        es: `• Diseño y desarrollo de una nueva funcionalidad en SAP Composable Storefront para la determinación dinámica de precios según el código postal del usuario.
• Implementación de validaciones de negocio complejas, garantizando rendimiento y buenas prácticas.
• Colaboración en el diseño de arquitectura y despliegue exitoso de la solución en producción.`,
        en: `• Designed and developed a new feature in SAP Composable Storefront for dynamic pricing determination based on user zip code.
• Implemented complex business validations, ensuring optimal performance and best practices.
• Collaborated in architecture design and successfully deployed the solution to production.`,
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
        es: `• Liderazgo en la migración del sistema e-commerce desde SAP Spartacus 1.5/Angular 8 hacia SAP Spartacus 4.3/Angular 12.
• Diseño de la estrategia de migración colaborando con un equipo interdisciplinario y resolviendo desafíos técnicos complejos.
• Capacitación del equipo en nuevas funcionalidades de Spartacus, buenas prácticas y estándares del framework.
• Logro: Mejora significativa en la experiencia de usuario, accesibilidad y seguridad del sistema.`,
        en: `• Led the migration of the e-commerce system from SAP Spartacus 1.5/Angular 8 to SAP Spartacus 4.3/Angular 12.
• Designed the migration strategy, collaborating with an interdisciplinary team and resolving complex technical challenges.
• Trained the team on new Spartacus features, framework best practices, and standards.
• Achievement: Significant improvement in user experience, system accessibility, and security.`,
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
        es: `• Desarrollo fullstack a medida (MERN/MEAN stack) para múltiples clientes y proyectos.
• Frontend: Arquitectura e implementación con Angular (RxJS, NgRx) y React (Redux, Context API).
• Backend: Node.js y Express con bases de datos relacionales y no relacionales.
• Integración de pasarelas de pago (MercadoPago, WebPay) y optimización SEO (Google Analytics).`,
        en: `• Custom fullstack development (MERN/MEAN stack) for multiple clients and projects.
• Frontend: Architecture and implementation using Angular (RxJS, NgRx) and React (Redux, Context API).
• Backend: Node.js and Express with relational and non-relational databases.
• Integration of payment gateways (MercadoPago, WebPay) and SEO optimization (Google Analytics).`,
      },
    },
  ];

  language$: Observable<string> = this.languageSelectorService.getLanguage();

  constructor(
    private languageSelectorService: LanguageSelectorService,
    private el: ElementRef
  ) {}

  ngAfterViewInit(): void {
    const container: HTMLElement = this.el.nativeElement.querySelector('.experience__info');
    if (container) {
      setTimeout(() => container.classList.add('animate__animated'), 50);
    }
  }
}
