import { Routes } from '@angular/router';

export const APP_ROUTES: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home',
  },
  {
    path: 'home',
    title: 'home',
    loadChildren: () => import('./components/home/home.routes').then(
      m => m.HOME_ROUTES
    )
  },
  {
    path: 'archive',
    loadChildren: () => import('./components/archive/archive.routes').then(
      m => m.ARCHIVE_ROUTES
    ),
  },
  {
    path: 'create',
    title: 'create',
    loadChildren: () => import('./components/create/create.routes').then(
      m => m.CREATE_ROUTES
    ),
  },
];
