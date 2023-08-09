import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { LanguageSelectorService } from 'src/app/services/language-selector.service';
import SwiperCore, { Autoplay, Navigation, SwiperOptions } from 'swiper';
import { Language } from '../../../models/language.interface';

SwiperCore.use([Navigation, Autoplay]);

@Component({
  selector: 'jdv-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss'],
})
export class ProjectComponent implements OnInit {
  @Input() isMobile: boolean = false;
  @Input() fromHome: boolean = false;
  title: Language = {
    es: 'Proyectos donde he colaborado',
    en: 'Projects where I have collaborated',
  };
  homeTitle: Language = {
    es: 'Proyectos',
    en: 'Projects',
  };
  viewSite: Language = { es: 'Ir al sitio', en: 'View' };
  projects = [
    {
      title: 'Marchand',
      image: '../../../assets/projects-logos/marchand-logo.svg',
      principalImage: '../../../../assets/projects-images/marchand-mobile.webp',
      url: 'https://www.marchand.com.mx/',
      target: '_blank',
    },
    {
      title: 'Sap Spartacus Demo ',
      image: '../../../assets/projects-logos/spartacus-logo.webp',
      principalImage:
        '../../../../assets/projects-images/spartacus-demo-mobile.webp',
      url: 'https://jdv-spartacus.netlify.app/',
      target: '_blank',
    },
    {
      title: 'Movie App',
      image: '../../../assets/projects-logos/movie-logo.webp',
      principalImage: '../../../../assets/projects-images/movie-mobile.webp',
      url: 'https://jdvmovies.netlify.app/',
      target: '_blank',
    },
    {
      title: 'Tupemesa Peru',
      image: '../../../assets/projects-logos/tupemesa-logo.webp',
      principalImage: '../../../../assets/projects-images/tupemesa.webp',
      url: 'https://tienda.tupemesa.com.pe/',
      target: '_blank',
    },
    {
      title: 'K-One Chile',
      image: '../../../assets/projects-logos/k1.webp',
      principalImage: '../../../../assets/projects-images/kone.webp',
      url: 'https://www.k1.cl',
      target: '_blank',
    },
    {
      title: 'Antihuman Chile',
      image: '../../../assets/projects-logos/antihuman.webp',
      principalImage: '../../../../assets/projects-images/antihuman.webp',
      url: 'https://www.antihuman.cl',
      target: '_blank',
    },
    {
      title: 'Bold Chile',
      image: '../../../assets/projects-logos/bold.webp',
      principalImage: '../../../../assets/projects-images/bold.webp',
      url: 'https://www.bold.cl',
      target: '_blank',
    },
    {
      title: 'Belsport Chile',
      image: '../../../assets/projects-logos/belsport.webp',
      principalImage: '../../../../assets/projects-images/belsport.webp',
      url: 'https://www.belsport.cl',
      target: '_blank',
    },
    {
      title: 'Bamers Chile',
      image: '../../../assets/projects-logos/bamers.webp',
      principalImage: '../../../../assets/projects-images/bamers.webp',
      url: 'https://www.bamers.cl',
      target: '_blank',
    },
    {
      title: 'Crocs Chile',
      image: '../../../assets/projects-logos/crocs.webp',
      principalImage: '../../../../assets/projects-images/crocs.webp',
      url: 'https://www.crocs.cl',
      target: '_blank',
    },
    {
      title: 'Aufbau Chile',
      image: '../../../assets/projects-logos/aufbau.webp',
      principalImage: '../../../../assets/projects-images/aufbau.webp',
      url: 'https://www.aufbau.cl',
      target: '_blank',
    },
    {
      title: 'Promesa Ecuador',
      image: '../../../assets/projects-logos/promesa-logo.webp',
      principalImage: '../../../../assets/projects-images/promesa.webp',
      url: '',
      target: '_blank',
    },
  ];
  swiperConfig: SwiperOptions = {};

  language$: Observable<string> = this.languageSelectorService.getLanguage();

  constructor(private languageSelectorService: LanguageSelectorService) {}

  ngOnInit(): void {
    this.swiperConfig = {
      slidesPerView: this.fromHome ? 5 : 4,
      spaceBetween: 10,
      pagination: true,
      navigation: true,
      breakpoints: {
        0: {
          slidesPerView: 1,
          slidesPerGroup: 1,
        },
        356: {
          slidesPerView: 2,
          slidesPerGroup: 2,
        },
        526: {
          slidesPerView: 3,
          slidesPerGroup: 3,
        },
        696: {
          slidesPerView: 3,
          slidesPerGroup: 3,
        },
        1100: {
          slidesPerView: 4,
          slidesPerGroup: 4,
        },
        1400: {
          slidesPerView: this.fromHome ? 5 : 4,
          slidesPerGroup: this.fromHome ? 5 : 4,
        },
      },
    };
  }
}
