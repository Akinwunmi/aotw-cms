import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home',
  },
  {
    path: 'home',
    title: 'Home',
    loadComponent: () => import('./components/home/home.component').then(
      m => m.HomeComponent
    ),
  },
  {
    path: 'archive',
    title: 'Archive',
    loadChildren: () => import('./components/archive/archive.routes').then(
      m => m.ARCHIVE_ROUTES
    ),
  },
  {
    path: 'create',
    title: 'Create',
    loadComponent: () => import('./components/create/create.component').then(
      m => m.CreateComponent
    ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
