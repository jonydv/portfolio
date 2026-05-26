import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Language } from 'src/app/models/language.interface';
import { BreakpointService } from 'src/app/services/breakpoint.service';
import { LanguageSelectorService } from 'src/app/services/language-selector.service';
import { Grid } from '../../../models/grid.interface';

@Component({
  selector: 'jdv-grid-banners',
  templateUrl: './grid-banners.component.html',
  styleUrls: ['./grid-banners.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
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
        es: 'Desarrollo de aplicaciones a medida en distintas escalas: análisis de requerimientos, estimación de tiempos, integración de APIs de terceros, optimización SEO y uso de los frameworks más actuales del mercado, lo que garantiza escalabilidad y mantenimiento a largo plazo.',
        en: 'Custom application development at any scale: requirements analysis, time estimation, third-party API integration, SEO optimization, and use of the latest industry frameworks — ensuring scalability and long-term maintainability.',
      },
      imageUrl: '../../../../assets/images/developer.webp',
      reverse: false,
    },
    {
      title: { es: 'Trabajo en equipo', en: 'Teamwork' },
      paragraph: {
        es: 'Trabajo bajo metodologías ágiles (Scrum, Kanban), control de versiones del código, code review entre miembros del equipo, uso de herramientas de gestión de proyectos y sesiones de brainstorming para la resolución colaborativa de problemas.',
        en: 'Working under agile methodologies (Scrum, Kanban), code version control, peer code review, use of project management tools, and collaborative brainstorming sessions for problem-solving.',
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
