import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { LanguageSelectorService } from 'src/app/services/language-selector.service';
import SwiperCore, { Navigation, SwiperOptions } from 'swiper';
import { Language } from '../../../models/language.interface';

SwiperCore.use([Navigation]);

@Component({
  selector: 'jdv-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit {

  title: Language = { es: 'Proyectos donde he colaborado', en: 'Projects where I have collaborated' };
  viewSite: Language = { es: 'Ir al sitio', en: 'View' };
  projects = [
    {
      title: 'Tupemesa Peru',
      image: '../../../assets/projects-logos/tupemesa-logo.webp',
      principalImage: '../../../../assets/projects-images/tupemesa.webp',
      url: 'https://tienda.tupemesa.com.pe/',
      target: '_blank'
    },
    {
      title: 'K-One Chile',
      image: '../../../assets/projects-logos/k1.webp',
      principalImage: '../../../../assets/projects-images/kone.webp',
      url: 'https://www.k1.cl',
      target: '_blank'
    },
    {
      title: 'Antihuman Chile',
      image: '../../../assets/projects-logos/antihuman.webp',
      principalImage: '../../../../assets/projects-images/antihuman.webp',
      url: 'https://www.antihuman.cl',
      target: '_blank'
    },
    {
      title: 'Bold Chile',
      image: '../../../assets/projects-logos/bold.webp',
      principalImage: '../../../../assets/projects-images/bold.webp',
      url: 'https://www.bold.cl',
      target: '_blank'
    },
    {
      title: 'Belsport Chile',
      image: '../../../assets/projects-logos/belsport.webp',
      principalImage: '../../../../assets/projects-images/belsport.webp',
      url: 'https://www.belsport.cl',
      target: '_blank'
    },
    {
      title: 'Bamers Chile',
      image: '../../../assets/projects-logos/bamers.webp',
      principalImage: '../../../../assets/projects-images/bamers.webp',
      url: 'https://www.bamers.cl',
      target: '_blank'
    },
    {
      title: 'Crocs Chile',
      image: '../../../assets/projects-logos/crocs.webp',
      principalImage: '../../../../assets/projects-images/crocs.webp',
      url: 'https://www.crocs.cl',
      target: '_blank'
    },
    {
      title: 'Aufbau Chile',
      image: '../../../assets/projects-logos/aufbau.webp',
      principalImage: '../../../../assets/projects-images/aufbau.webp',
      url: 'https://www.aufbau.cl',
      target: '_blank'
    },
    {
      title: 'Promesa Ecuador',
      image: '../../../assets/projects-logos/promesa-logo.webp',
      principalImage: '../../../../assets/projects-images/promesa.webp',
      url: '',
      target: '_blank'
    }
  ];
  swiperConfig: SwiperOptions = {
    slidesPerView: 4,
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
      1400: {
        slidesPerView: 4,
        slidesPerGroup: 4,
      },

    },
  };

  language$: Observable<string> = this.languageSelectorService.getLanguage();

  constructor(private languageSelectorService: LanguageSelectorService) { }

  ngOnInit(): void {
  }

}
