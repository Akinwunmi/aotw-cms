import { Route } from '@angular/router';

import { MyAccountComponent } from './my-account.component';

export const MY_ACCOUNT_ROUTES: Route[] = [
  {
    path: '',
    component: MyAccountComponent,
    title: 'My Account',
  }
];
