import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Hero } from 'src/app/models/hero.interface';
import { BreakpointService } from '../../../services/breakpoint.service';
import { LanguageSelectorService } from '../../../services/language-selector.service';
interface Resume{
  first: string;
  name: string;
  position: string;
  resume: Item;
  callToAction: string;
  imageUrl: string;
}
interface Item{
  [key: string]: string;
}
@Component({
  selector: 'jdv-hero-section',
  templateUrl: './hero-section.component.html',
  styleUrls: ['./hero-section.component.scss']
})

export class HeroSectionComponent implements OnInit {

  isMobile$: Observable<boolean> = this.breakpointService.isMobile$;

  heroInfo: Hero = {
    first: {es: 'Hola, mi nombre es', en: 'Hi, my name is'},
    name: {es: 'Jonatan Villalba.', en: 'Jonatan Villalba.'},
    position: {es: 'Desarrollador de software.', en: 'Software Developer'},
    resume: {es:`Soy analista de sistemas especializado en el desarrollo de aplicaciones web.
      Actualmente me encuentro enfocado en la utilización de los últimos frameworks,
      para obtener aplicaciones escalables y eficientes.
      Me consideró un apasionado por la tecnologia, el trabajo en equipo y me entusiasman
      los nuevos desafios `,
    en: `I am a systems analyst specialized in the development of web applications. Currently I am focused on the use of the latest frameworks, to obtain scalable and efficient applications. He considered me passionate about technology, teamwork and I am excited about new challenges`},
    callToAction: {es: 'Ver proyectos', en: 'See projects'},
    imageUrl: '../../../../assets/images/profile.png'
  };

  language$: Observable<string> = this.languageSelectorService.getLanguage();
  constructor(
      private breakpointService: BreakpointService,
      private languageSelectorService: LanguageSelectorService,
      private router: Router
    ) { }

  ngOnInit(): void {
  }

  navigateByUrl(url: string){
    this.router.navigateByUrl(url);
  }
}
