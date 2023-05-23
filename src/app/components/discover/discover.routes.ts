import { Route } from '@angular/router';

import { TopicComponent } from '../topic';
import { DiscoverComponent } from './discover.component';

export const DISCOVER_ROUTES: Route[] = [
  {
    path: '',
    component: DiscoverComponent,
    title: 'Discover',
    children: [
      {
        path: 'topic',
        loadChildren: () => import('../topic/topic.routes').then(m => m.TOPIC_ROUTES),
        title: 'Topic'
      }
    ]
  }
];
