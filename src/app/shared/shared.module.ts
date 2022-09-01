import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SwiperModule } from 'swiper/angular';
import { HeaderComponent } from './components/header/header.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { HeroSectionComponent } from './components/hero-section/hero-section.component';
import { RouterModule } from '@angular/router';
import { ProfileImageComponent } from './components/profile-image/profile-image.component';
import { SkillsComponent } from './components/skills/skills.component';
import { ContactComponent } from './components/contact/contact.component';
import { EducationComponent } from './components/education/education.component';
import { ExperienceComponent } from './components/experience/experience.component';
import { ProjectComponent } from './components/project/project.component';
import { ServicesSectionComponent } from './components/services-section/services-section.component';
import { SocialContactComponent } from './components/social-contact/social-contact.component';
import { GridBannersComponent } from './components/grid-banners/grid-banners.component';
import { AnimateOnScrollModule } from 'ng2-animate-on-scroll';
import { LanguageSelectorComponent } from './components/language-selector/language-selector.component';
import { FooterComponent } from './components/footer/footer.component';



@NgModule({
  declarations: [
    HeaderComponent,
    SpinnerComponent,
    HeroSectionComponent,
    ProfileImageComponent,
    SkillsComponent,
    ContactComponent,
    EducationComponent,
    ExperienceComponent,
    ProjectComponent,
    ServicesSectionComponent,
    SocialContactComponent,
    GridBannersComponent,
    LanguageSelectorComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    SwiperModule,
    AnimateOnScrollModule.forRoot()
  ],
  exports: [
    HeaderComponent,
    SpinnerComponent,
    HeroSectionComponent,
    ProfileImageComponent,
    SkillsComponent,
    ContactComponent,
    EducationComponent,
    ExperienceComponent,
    ProjectComponent,
    ServicesSectionComponent,
    GridBannersComponent,
    LanguageSelectorComponent,
    FooterComponent
  ]
})
export class SharedModule { }
