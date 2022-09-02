import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { BreakpointService } from '../../../services/breakpoint.service';
import { Observable } from 'rxjs';
import { ScrollLockService } from '../../../services/scroll-lock.service';
import { Header } from '../../../models/header.interface';
import { LanguageSelectorService } from 'src/app/services/language-selector.service';

@Component({
  selector: 'jdv-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  //encapsulation: ViewEncapsulation.None
})
export class HeaderComponent implements OnInit {
  showNav: boolean = false;
  isMobile$: Observable<boolean> = this.breakpointService.isMobile$;
  navItems: Header[] = [
    {title: {es: 'Inicio', en: 'Home'}, link: '/'},
    // {title: {es: 'Experiencia', en: 'Experience'}, link: '/experience'},
    {title: {es: 'Trabajos', en: 'Works'}, link: '/works'},
    // {title: {es:'Contacto', en: 'Contact'}, link: '/contact'},
    {title: {es: 'Curriculum', en: 'Curriculum'}, link: '/curriculum'}
  ];
  language$: Observable<string> = this.languageSelectorService.getLanguage();
  constructor(
      private breakpointService: BreakpointService,
      private scrollLockService: ScrollLockService,
      private languageSelectorService: LanguageSelectorService
      ) { }

  ngOnInit(): void {
  }

  toggleShowNav(){
    this.showNav = !this.showNav;
    if(this.showNav){
      this.scrollLockService.lock();
    }else{
      this.scrollLockService.unlock();
    }
  }
}
