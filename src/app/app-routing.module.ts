import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CurriculumComponent } from './pages/curriculum/curriculum.component';
import { WorksComponent } from './pages/works/works.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./pages/pages.module').then((m) => m.PagesModule),
  },
  {
    path: 'curriculum',
    component: CurriculumComponent,
    title: 'Curriculum | Jonatan David Villalba',
  },
  {
    path: 'works',
    component: WorksComponent,
    title: 'Trabajos | Works | Jonatan David Villalba',
  },
  {
    path: '**',
    redirectTo: '',
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'enabled',
      initialNavigation: 'enabledNonBlocking',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
