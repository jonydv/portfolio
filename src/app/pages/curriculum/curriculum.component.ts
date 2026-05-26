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
        es: 'Liderar arquitecturas frontend escalables con Angular y Next.js en equipos de alto rendimiento.',
        en: 'Lead scalable frontend architectures with Angular and Next.js in high-performance teams.',
      },
    },
    {
      icon: 'fas fa-robot',
      text: {
        es: 'Integrar flujos de IA (Claude Agents, MCP, Copilot) en productos de software real, acelerando el desarrollo y la calidad.',
        en: 'Integrate AI workflows (Claude Agents, MCP, Copilot) into real software products, accelerating development and quality.',
      },
    },
    {
      icon: 'fas fa-box-open',
      text: {
        es: 'Construir y publicar bibliotecas reutilizables de componentes y utilidades que impacten múltiples proyectos.',
        en: 'Build and publish reusable component and utility libraries that impact multiple projects.',
      },
    },
    {
      icon: 'fas fa-handshake',
      text: {
        es: 'Crecer como freelance y consultor técnico, entregando soluciones end-to-end con resultados medibles para mis clientes.',
        en: 'Grow as a freelance developer and technical consultant, delivering end-to-end solutions with measurable results for clients.',
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
