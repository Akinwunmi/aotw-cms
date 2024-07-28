import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

import { UserService } from '../services';
import { UserRole } from '../models';

export const authGuard: CanActivateFn = () => {
  const router = inject(Router);
  const userService = inject(UserService);

  const isAdmin = userService.roles().includes(UserRole.Admin);
  if (!isAdmin) {
    router.navigate(['/']);
    return false;
  }

  return true;
};
