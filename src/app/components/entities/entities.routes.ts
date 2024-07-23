import { Route } from '@angular/router';

import { EntitiesComponent } from './entities.component';

export const ENTITY_ROUTES: Route[] = [
  {
    path: ':id',
    component: EntitiesComponent,
    title: 'Entity'
  }
];
