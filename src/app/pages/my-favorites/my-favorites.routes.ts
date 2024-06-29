import { Route } from '@angular/router';

import { MyFavoritesComponent } from './my-favorites.component';

export const MY_FAVORITES_ROUTES: Route[] = [
  {
    path: '',
    component: MyFavoritesComponent,
    title: 'My Favorites'
  }
];
