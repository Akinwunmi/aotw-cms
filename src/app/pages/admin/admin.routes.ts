import { Route } from '@angular/router';

import { authGuard } from '../../guards';

import { AdminComponent } from './admin.component';

export const ADMIN_ROUTES: Route[] = [
  {
    path: '',
    component: AdminComponent,
    title: 'Admin',
    canActivate: [authGuard],
  },
  {
    path: 'add-entity',
    loadChildren: () => import('../add-entity').then(
      m => m.ADD_ENTITY_ROUTES
    ),
  },
];
