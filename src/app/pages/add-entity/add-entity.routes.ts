import { Route } from '@angular/router';

import { authGuard } from '../../guards';

import { AddEntityComponent } from './add-entity.component';

export const ADD_ENTITY_ROUTES: Route[] = [
  {
    path: '',
    component: AddEntityComponent,
    title: 'Add Entity',
    canActivate: [authGuard],
  }
];
