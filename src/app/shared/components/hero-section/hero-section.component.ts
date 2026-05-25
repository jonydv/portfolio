import { Component } from '@angular/core';
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
})
export class HeroSectionComponent {
  isMobile$: Observable<boolean> = this.breakpointService.isMobile$;

  heroInfo: Hero = {
    first: { es: 'Hola, mi nombre es', en: 'Hi, my name is' },
    name: { es: 'Jonatan David Villalba', en: 'Jonatan David Villalba' },
    position: { es: 'Senior Front-End Developer & Solution Architect.', en: 'Senior Front-End Developer & Solution Architect.' },
    resume: {
      es: `Soy Analista de Sistemas especializado en la arquitectura y desarrollo de aplicaciones web escalables. Actualmente me enfoco en liderar proyectos con Next.js, Angular, SAP Spartacus y flujos dinámicos con Inteligencia Artificial (Agentes / Claude). Me apasiona crear bibliotecas reutilizables, optimizar la experiencia de usuario (UX/UI) y llevar soluciones innovadoras a producción bajo las mejores prácticas.`,
      en: `I am a Systems Analyst specializing in the architecture and development of scalable web applications. Currently, I focus on leading projects with Next.js, Angular, SAP Spartacus, and dynamic Artificial Intelligence workflows (Agents / Claude). I am passionate about creating reusable libraries, optimizing the user experience (UX/UI), and bringing innovative solutions to production using best practices.`,
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
