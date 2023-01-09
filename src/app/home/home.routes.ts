import { Route } from '@angular/router';

import { SearchComponent } from '../search';
import { HomeComponent } from './home.component';

export const HOME_ROUTES: Route[] = [
  {
    path: '',
    component: HomeComponent,
    title: 'Home',
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'search'
      },
      {
        path: 'search',
        component: SearchComponent,
        title: 'Search'
      }
    ]
  }
];