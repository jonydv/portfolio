import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Language } from 'src/app/models/language.interface';
import { BreakpointService } from 'src/app/services/breakpoint.service';
import { LanguageSelectorService } from 'src/app/services/language-selector.service';
import { Grid } from '../../../models/grid.interface';

@Component({
  selector: 'jdv-grid-banners',
  templateUrl: './grid-banners.component.html',
  styleUrls: ['./grid-banners.component.scss'],
})
export class GridBannersComponent implements OnInit {
  viewPage: Language = {
    es: 'Ir al sitio',
    en: 'Go to site',
  };
  isMobile$: Observable<boolean> = this.breakpointService.isMobile$;
  @Input() fromWorks: boolean = false;
  @Input() gridItems: Grid[] = [
    {
      title: { es: 'Desarrollo integral', en: 'Integral development' },
      paragraph: {
        es: 'Desarrollo de aplicaciones en distintas escalas, a medida, analisis de los requerimientos, estimación de tiempos, implementación de Apis de terceros, optimización SEO para el posicionamiento, utilización de los últimos frameworks del mercado, lo que permite escalabilidad, previsibilidad y mantenimiento a largo plazo.',
        en: 'Development of applications on different scales, custom, analysis of requirements, time estimation, implementation of third-party APIs, SEO optimization for positioning, use of the latest market frameworks, which allows scalability, predictability and long-term maintenance.',
      },
      imageUrl: '../../../../assets/images/developer.webp',
      reverse: false,
    },
    {
      title: { es: 'Trabajo en equipo', en: 'Teamwork' },
      paragraph: {
        es: 'Utilización de metodologias de trabajo agiles, Scrum, Kanban, control de versionado de código, "Code review" entre partners de las mismas areas del equipo, utilización de herramientas para gestión de proyectos, "Brainstorming".',
        en: 'Use of agile work methodologies, Scrum, Kanban, code version control, "Code review" between partners from the same areas of the team, use of project management tools, "Brainstorming".',
      },
      imageUrl: '../../../../assets/images/teamwork.webp',
      reverse: true,
    },
  ];
  language$: Observable<string> = this.languageSelectorService.getLanguage();
  constructor(
    private breakpointService: BreakpointService,
    private languageSelectorService: LanguageSelectorService
  ) {}

  ngOnInit(): void {}
}
