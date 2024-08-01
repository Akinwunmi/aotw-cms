import { Route } from '@angular/router';

import { authGuard } from '../../guards';

import { AddEntityComponent } from './add-entity.component';

export const ADD_ENTITY_ROUTES: Route[] = [
  {
    path: 'add',
    component: AddEntityComponent,
    title: 'Add Entity',
    canActivate: [authGuard],
  },
  {
    path: 'edit/:id',
    component: AddEntityComponent,
    title: 'Edit Entity',
    canActivate: [authGuard],
  },
];
