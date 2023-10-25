import { Route } from '@angular/router';

import { TopicsComponent } from './topics.component';

export const TOPIC_ROUTES: Route[] = [
  {
    path: ':id',
    component: TopicsComponent,
    title: 'Topic'
  }
];
