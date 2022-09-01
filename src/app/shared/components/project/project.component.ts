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

  title: Language = {es: 'Proyectos donde he colaborado', en: 'Projects where I have collaborated'};
  viewSite: Language = {es: 'Ir al sitio', en: 'View'};
  projects = [
    {
      title: 'K-One Chile',
      image: '../../../assets/projects-logos/k1.png',
      principalImage: '../../../../assets/projects-images/kone.jpg',
      url: 'https://www.k1.cl',
      target: '_blank'
    },
    {
      title: 'Antihuman Chile',
      image: '../../../assets/projects-logos/antihuman.svg',
      principalImage: '../../../../assets/projects-images/antihuman.jpg',
      url: 'https://www.antihuman.cl',
      target: '_blank'
    },
    {
      title: 'Bold Chile',
      image: '../../../assets/projects-logos/bold.svg',
      principalImage: '../../../../assets/projects-images/bold.jpg',
      url: 'https://www.bold.cl',
      target: '_blank'
    },
    {
      title: 'Belsport Chile',
      image: '../../../assets/projects-logos/belsport.png',
      principalImage: '../../../../assets/projects-images/belsport.jpg',
      url: 'https://www.belsport.cl',
      target: '_blank'
    },
    {
      title: 'Bamers Chile',
      image: '../../../assets/projects-logos/bamers.png',
      principalImage: '../../../../assets/projects-images/bamers.jpg',
      url: 'https://www.bamers.cl',
      target: '_blank'
    },
    {
      title: 'Crocs Chile',
      image: '../../../assets/projects-logos/crocs.svg',
      principalImage: '../../../../assets/projects-images/crocs.jpg',
      url: 'https://www.crocs.cl',
      target: '_blank'
    },
    {
      title: 'Aufbau Chile',
      image: '../../../assets/projects-logos/aufbau.svg',
      principalImage: '../../../../assets/projects-images/aufbau.jpg',
      url: 'https://www.aufbau.cl',
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
