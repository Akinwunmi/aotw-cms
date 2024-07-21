import { Routes } from '@angular/router';

import { PageNotFoundComponent } from './pages/page-not-found';

export const APP_ROUTES: Routes = [
  {
    path: '',
    loadChildren: () => import('./pages/archive').then(
      m => m.ARCHIVE_ROUTES
    ),
  },
  {
    path: 'about',
    loadChildren: () => import('./pages/about').then(
      m => m.ABOUT_ROUTES
    )
  },
  {
    path: 'signup',
    loadChildren: () => import('./pages/signup').then(
      m => m.SIGNUP_ROUTES
    )
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login').then(
      m => m.LOGIN_ROUTES
    )
  },
  {
    path: 'my-account',
    loadChildren: () => import('./pages/my-account').then(
      m => m.MY_ACCOUNT_ROUTES
    )
  },
  {
    path: 'my-favorites',
    loadChildren: () => import('./pages/my-favorites').then(
      m => m.MY_FAVORITES_ROUTES
    )
  },
  {
    path: '**',
    pathMatch: 'full',
    component: PageNotFoundComponent
  }
];
