// src/app/guards/admin.guard.ts
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const adminGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);

  const user = auth.currentUser$.getValue();
  const isAdmin = !!user && user.role === 'ADMIN';

  if (isAdmin) return true;
  router.navigateByUrl('/sign-in');
  return false;
};
