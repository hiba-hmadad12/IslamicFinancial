import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);

  // connecté si un token Basic est présent
  const loggedIn = auth.isLoggedIn();
  if (loggedIn) return true;

  router.navigateByUrl('/sign-in');
  return false;
};
