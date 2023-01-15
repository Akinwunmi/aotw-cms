import { Route } from '@angular/router';

import { DiscoverComponent } from '../discover';
import { SearchComponent } from '../search';
import { ArchiveComponent } from './archive.component';

export const ARCHIVE_ROUTES: Route[] = [
  {
    path: '',
    component: ArchiveComponent,
    title: 'Archive',
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
      },
      {
        path: 'discover',
        component: DiscoverComponent,
        title: 'Discover'
      }
    ]
  }
];