import { Route } from '@angular/router';

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
        redirectTo: 'discover'
      },
      {
        path: 'search',
        loadChildren: () => import('../search/search.routes').then(
          m => m.SEARCH_ROUTES
        )
      },
      {
        path: 'discover',
        loadChildren: () => import('../discover/discover.routes').then(
          m => m.DISCOVER_ROUTES
        )
      }
    ]
  }
];
