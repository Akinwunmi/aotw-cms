import { Route } from '@angular/router';

import { CreateComponent } from '../create';
import { SearchComponent } from '../search';

import { ArchiveComponent } from './archive.component';

export const ARCHIVE_ROUTES: Route[] = [
  {
    path: ':id',
    component: ArchiveComponent,
    title: 'Archive',
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'discover'
      },
      {
        path: 'search',
        component: SearchComponent,
        title: 'Search'
      },
      {
        path: 'discover',
        loadChildren: () => import('../discover/discover.routes').then(
          m => m.DISCOVER_ROUTES
        ),
        title: 'Discover'
      },
      {
        path: 'edit',
        component: CreateComponent,
        title: 'Edit'
      }
    ]
  }
];
