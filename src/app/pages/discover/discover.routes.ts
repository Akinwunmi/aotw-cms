import { Route } from '@angular/router';

import { DiscoverComponent } from './discover.component';

export const DISCOVER_ROUTES: Route[] = [
  {
    path: '',
    component: DiscoverComponent,
    title: 'Discover',
    children: [
      {
        path: 'entity',
        loadChildren: () => import('../../components/entities/entities.routes').then(
          m => m.ENTITY_ROUTES
        ),
      }
    ]
  }
];
