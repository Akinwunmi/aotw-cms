import { Route } from '@angular/router';
import { TopicComponent } from './topic.component';

// TODO: Fix routing
export const TOPIC_ROUTES: Route[] = [
  {
    path: ':id',
    component: TopicComponent,
    title: 'Topic'
  }
];
