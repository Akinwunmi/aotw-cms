import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

import { UserService } from '../services';
import { UserRole } from '../models';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const userService = inject(UserService);

  const isAdmin = userService.roles().includes(UserRole.Admin);
  const isAdminPage = (route.title === 'Admin' || state.url === '/admin');
  if (!isAdmin && isAdminPage) {
    router.navigate(['/']);
    return false;
  }

  return true;
};
