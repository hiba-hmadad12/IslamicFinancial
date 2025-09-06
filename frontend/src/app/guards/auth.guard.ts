// src/app/guards/auth.guard.ts (ou services/auth.guard.ts)
import { inject } from '@angular/core';
import { Router, UrlTree, CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { filter, take, map } from 'rxjs/operators';

export const authGuard: CanActivateFn = (route, state) => {
  const auth = inject(AuthService);
  const router = inject(Router);

  // Attendre la fin d'initialisation (validation /auth/me)
  return auth.ready$.pipe(
    filter(Boolean),   // attend que ready$ === true
    take(1),
    map((): boolean | UrlTree =>
      auth.isLoggedIn()
        ? true
        : router.createUrlTree(['/sign-in'], { queryParams: { returnUrl: state.url } })
    )
  );
};
