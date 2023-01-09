import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home'
  },
  {
    path: 'home',
    title: 'Home',
    loadChildren: () => import('./home/home.routes').then(m => m.HOME_ROUTES)
  },
  {
    path: 'create',
    loadComponent: () => import('./create/create.component').then(m => m.CreateComponent),
    title: 'Create'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
