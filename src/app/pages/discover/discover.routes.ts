import { Route } from '@angular/router';

import { DiscoverComponent } from './discover.component';

export const DISCOVER_ROUTES: Route[] = [
  {
    path: '',
    component: DiscoverComponent,
    title: 'Discover',
    children: [
      {
        path: 'topic',
        loadChildren: () => import('../../components/topics/topics.routes').then(
          m => m.TOPIC_ROUTES
        ),
      }
    ]
  }
];
