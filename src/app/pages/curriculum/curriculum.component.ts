import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { Observable } from 'rxjs';
import { LanguageSelectorService } from 'src/app/services/language-selector.service';
import { Language } from '../../models/language.interface';
import { BreakpointService } from '../../services/breakpoint.service';

@Component({
  selector: 'jdv-curriculum',
  templateUrl: './curriculum.component.html',
  styleUrls: ['./curriculum.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CurriculumComponent {
  name: string = 'Jonatan David Villalba';
  position: Language = {
    es: 'Senior Frontend Engineer',
    en: 'Senior Frontend Engineer',
  };
  goalsTitle: Language = { es: 'Objetivos Profesionales', en: 'Professional Goals' };
  goals: { icon: string; text: Language }[] = [
    {
      icon: 'fas fa-layer-group',
      text: {
        es: 'Consolidarme como un referente Senior Frontend, liderando el desarrollo de aplicaciones web escalables y de alto rendimiento. Profundizar mi dominio de Angular, Next.js y SAP Spartacus para mentorear equipos, definir estándares técnicos y elevar la calidad del código en cada proyecto que integre.',
        en: 'Establish myself as a Senior Frontend reference, leading the development of scalable, high-performance web applications. Deepen my expertise in Angular, Next.js, and SAP Spartacus to mentor teams, define technical standards, and raise the code quality bar on every project I\'m part of.',
      },
    },
    {
      icon: 'fas fa-robot',
      text: {
        es: 'Liderar la adopción de flujos de desarrollo potenciados por IA — desde agentes autónomos con Claude hasta copilots integrados en el ciclo de desarrollo — para entregar software de mayor calidad en menor tiempo, sin sacrificar arquitectura ni legibilidad de código.',
        en: 'Lead the adoption of AI-powered development workflows — from autonomous Claude agents to copilots integrated in the dev cycle — shipping higher quality software faster without sacrificing architecture or code readability.',
      },
    },
    {
      icon: 'fas fa-box-open',
      text: {
        es: 'Publicar una biblioteca open source de componentes y utilidades que extienda el trabajo que vengo construyendo internamente, para que otros equipos puedan arrancar proyectos Angular o Next.js desde una base sólida, bien documentada y lista para producción.',
        en: 'Publish an open-source component and utility library that extends the internal work I\'ve been building, giving other teams a solid, well-documented, production-ready foundation for their Angular and Next.js projects.',
      },
    },
    {
      icon: 'fas fa-handshake',
      text: {
        es: 'Continuar expandiendo mi trabajo freelance y de consultoría, aportando expertise en e-commerce B2B/B2C con SAP Spartacus, arquitectura de soluciones y desarrollo fullstack para startups y empresas que quieren crecer con tecnología de primer nivel.',
        en: 'Keep expanding my freelance and consulting work, bringing expertise in B2B/B2C e-commerce with SAP Spartacus, solution architecture, and fullstack development to startups and companies looking to scale with top-tier technology.',
      },
    },
  ];
  language$: Observable<string> = this.languageSelectorService.getLanguage();
  isMobile$: Observable<boolean> = this.breakpointService.isMobile$;
  constructor(
    private languageSelectorService: LanguageSelectorService,
    private breakpointService: BreakpointService
  ) {}
}
