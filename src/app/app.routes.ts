import { Routes } from '@angular/router';

import { PageNotFoundComponent } from './pages/page-not-found';

export const APP_ROUTES: Routes = [
  {
    path: '',
    loadChildren: () => import('./pages/archive/archive.routes').then(
      m => m.ARCHIVE_ROUTES
    ),
  },
  {
    path: '**',
    pathMatch: 'full',
    component: PageNotFoundComponent
  }
];
