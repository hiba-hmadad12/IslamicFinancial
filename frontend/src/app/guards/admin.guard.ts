// src/app/guards/admin.guard.ts
import { inject } from '@angular/core';
import { CanActivateFn, Router, UrlTree } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { filter, take, map } from 'rxjs/operators';

export const adminGuard: CanActivateFn = (route, state) => {
  const auth = inject(AuthService);
  const router = inject(Router);

  // Attendre la fin de l'init (validation /auth/me)
  return auth.ready$.pipe(
    filter(Boolean),
    take(1),
    map((): boolean | UrlTree => {
      const user = auth.currentUser$.value; // ou getValue()
      if (!user) {
        // pas connecté → sign-in avec retour
        return router.createUrlTree(['/sign-in'], {
          queryParams: { returnUrl: state.url }
        });
      }
      const role = (user.role || '').toUpperCase();
      return (role === 'ADMIN' || role === 'ROLE_ADMIN')
        ? true
        : router.createUrlTree(['/']); // ou vers une page 403 si tu en as une
    })
  );
};
