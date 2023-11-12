import { Routes } from '@angular/router';

export const APP_ROUTES: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'archive',
  },
  {
    path: 'home',
    title: 'home',
    loadChildren: () => import('./pages/home/home.routes').then(
      m => m.HOME_ROUTES
    )
  },
  {
    path: 'archive',
    loadChildren: () => import('./pages/archive/archive.routes').then(
      m => m.ARCHIVE_ROUTES
    ),
  }
];
