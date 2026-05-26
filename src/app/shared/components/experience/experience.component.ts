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
        es: `Desarrollo front-end con Angular e implementación y customización de SAP Spartacus | Composable Storefront para sitios E-commerce B2B y B2C. Arquitecté y construí bibliotecas reutilizables (para SAP Spartacus y Next.js) publicadas en AWS CodeArtifact, lo que permite a nuevos proyectos arrancar desde una base sólida y lista para producción desde el primer día. Estas librerías se adoptaron en múltiples proyectos internos e incluyen integración con Tailwind CSS, Next-Auth, Hero-UI, TanStack, boilerplates y flujos de agentes con IA. Bajo metodologías ágiles, code review y siempre con foco en accesibilidad, performance, SEO y mobile-first.`,
        en: `Front-end development with Angular and implementation and customization of SAP Spartacus | Composable Storefront for B2B and B2C e-commerce sites. Architected and built reusable libraries (for both SAP Spartacus and Next.js projects) published via AWS CodeArtifact, enabling new projects to launch from a solid, production-ready foundation from day one. These libraries were adopted across multiple company projects and include Tailwind CSS, Next-Auth, Hero-UI, TanStack, boilerplates, and AI agent workflow integrations. All under agile methodologies, code review, and with a consistent focus on accessibility, performance, SEO, and mobile-first development.`,
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
        es: `Como Arquitecto de Solución en el proyecto Marchand de México, diseñé y desarrollé una nueva funcionalidad en Spartacus / SAP Composable Storefront para determinar dinámicamente la lista de precios según la ciudad del usuario a partir de su código postal. El principal desafío fue implementar las actualizaciones necesarias y ejecutar validaciones de negocio complejas garantizando rendimiento y buenas prácticas. La funcionalidad fue desplegada exitosamente en producción.`,
        en: `As a Solution Architect for the Marchand de Mexico project, I designed and developed a new feature in Spartacus / SAP Composable Storefront to dynamically determine the price list based on the user's city via their zip code. The main challenge was implementing the required updates and handling complex business validations while maintaining performance and best practices. The feature was successfully deployed to production.`,
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
        es: `Lideré la migración del sistema de comercio electrónico de un cliente desde SAP Spartacus 1.5 y Angular 8 hasta SAP Spartacus 4.3 y Angular 12. Diseñé la estrategia de migración con un equipo interdisciplinario, coordiné la gestión de stakeholders y resolví desafíos técnicos complejos a lo largo del proceso. Trabajé junto a los equipos de desarrollo y operaciones para implementar y optimizar las nuevas funcionalidades de Spartacus 4.3, y capacité al equipo en buenas prácticas y estándares del framework. Como resultado, se logró una mejora significativa en la experiencia de usuario, accesibilidad y seguridad del sistema.`,
        en: `Led the migration of a client's e-commerce system from SAP Spartacus 1.5 and Angular 8 to SAP Spartacus 4.3 and Angular 12. Designed the migration strategy with an interdisciplinary team, managed stakeholder coordination, and resolved complex technical challenges throughout the process. Collaborated with development and operations teams to implement and optimize new Spartacus 4.3 features, and trained the team on framework best practices and standards. The migration resulted in a significant improvement in user experience, accessibility, and system security.`,
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
        es: `Desarrollo fullstack de aplicaciones web a medida, cubriendo front-end y back-end. Front-end con Angular (RxJS, NgRx, Angular Material) y React (TypeScript, Redux, Context API). Back-end con Node.js y Express en JavaScript y TypeScript. Bases de datos relacionales (MySQL, SQL Server, PostgreSQL) y no relacionales (MongoDB). Integración de APIs de pago (MercadoPago, WebPay), optimización SEO con Google Analytics y estrategias de personalización basadas en datos de usuario.`,
        en: `Full-stack development of custom web applications covering both front-end and back-end. Front-end with Angular (RxJS, NgRx, Angular Material) and React (TypeScript, Redux, Context API). Back-end with Node.js and Express in JavaScript and TypeScript. Relational (MySQL, SQL Server, PostgreSQL) and non-relational (MongoDB) databases. Integration of payment APIs (MercadoPago, WebPay), SEO optimization with Google Analytics, and user-data-driven personalization strategies.`,
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
