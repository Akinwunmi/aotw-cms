import { Routes } from '@angular/router';

import { LoginComponent } from './components/login';

export const APP_ROUTES: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home',
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'home',
    title: 'Home',
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
    title: 'Create',
    loadChildren: () => import('./components/create/create.routes').then(
      m => m.CREATE_ROUTES
    ),
  },
  {
    path: '**',
    redirectTo: 'home'
  }
];
