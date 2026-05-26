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
      es: `Senior Frontend Engineer especializado en arquitectura de aplicaciones web escalables. Lidero proyectos enterprise con Angular, Next.js y SAP Spartacus, integrando flujos de trabajo potenciados por IA. Me apasiona construir bibliotecas reutilizables, elevar la experiencia de desarrollo (DX) y entregar productos con alto rendimiento y accesibilidad.`,
      en: `Senior Frontend Engineer specializing in scalable web architecture. I lead enterprise projects using Angular, Next.js, and SAP Spartacus, integrating AI-powered workflows. Passionate about building reusable libraries, optimizing Developer Experience (DX), and shipping high-performance, accessible products.`,
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
