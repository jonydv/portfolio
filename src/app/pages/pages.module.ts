import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorPageComponent } from './error-page/error-page.component';
import { PagesRoutingModule } from './pages-routing.module';
import { HomeComponent } from './home/home.component';
import { SharedModule } from '../shared/shared.module';
import { CurriculumComponent } from './curriculum/curriculum.component';
import { WorksComponent } from './works/works.component';
import { GoalsComponent } from './goals/goals.component';



@NgModule({
  declarations: [ErrorPageComponent, HomeComponent, CurriculumComponent, WorksComponent, GoalsComponent],
  imports: [
    CommonModule,
    PagesRoutingModule,
    SharedModule
  ]
})
export class PagesModule { }
