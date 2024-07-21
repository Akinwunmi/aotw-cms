import { Route } from '@angular/router';

import { AboutComponent } from './about.component';

export const ABOUT_ROUTES: Route[] = [
  {
    path: '',
    component: AboutComponent,
    title: 'About This Project',
  }
];
