import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Hero } from 'src/app/models/hero.interface';
import { BreakpointService } from '../../../services/breakpoint.service';
import { LanguageSelectorService } from '../../../services/language-selector.service';
interface Resume {
  first: string;
  name: string;
  position: string;
  resume: Item;
  callToAction: string;
  imageUrl: string;
}
interface Item {
  [key: string]: string;
}
@Component({
  selector: 'jdv-hero-section',
  templateUrl: './hero-section.component.html',
  styleUrls: ['./hero-section.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeroSectionComponent {
  isMobile$: Observable<boolean> = this.breakpointService.isMobile$;

  heroInfo: Hero = {
    first: { es: 'Hola, soy', en: "Hi, I'm" },
    name: { es: 'Jonatan David Villalba', en: 'Jonatan David Villalba' },
    position: { es: 'Senior Frontend Engineer — Angular · Next.js · AI Workflows', en: 'Senior Frontend Engineer — Angular · Next.js · AI Workflows' },
    resume: {
      es: `Soy Senior Frontend Engineer especializado en la arquitectura y desarrollo de aplicaciones web escalables. Actualmente lidero proyectos con Next.js, Angular y SAP Spartacus, con foco en flujos de trabajo potenciados por IA y agentes autónomos. Me apasiona construir bibliotecas reutilizables, elevar el estándar de UX/UI y llevar soluciones a producción que equilibren rendimiento, accesibilidad y experiencia de desarrollo.`,
      en: `I'm a Senior Frontend Engineer specializing in the architecture and development of scalable web applications. Currently leading projects built on Next.js, Angular, and SAP Spartacus, with a strong focus on AI-powered workflows and autonomous agents. Passionate about building reusable libraries, raising the bar on UX/UI, and shipping production-ready solutions that balance performance, accessibility, and developer experience.`,
    },
    callToAction: { es: 'Ver proyectos', en: 'See projects' },
    imageUrl: '../../../../assets/images/profile.png',
  };

  language$: Observable<string> = this.languageSelectorService.getLanguage();

  constructor(
    private breakpointService: BreakpointService,
    private languageSelectorService: LanguageSelectorService,
    private router: Router
  ) {}

  navigateByUrl(url: string) {
    this.router.navigateByUrl(url);
  }
}
