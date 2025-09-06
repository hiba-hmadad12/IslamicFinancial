// src/app/guards/auth-match.guard.ts
import { inject } from '@angular/core';
import { CanMatchFn, Router, UrlTree } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { filter, take, map } from 'rxjs/operators';

export const authMatchGuard: CanMatchFn = (route, segments) => {
  const auth = inject(AuthService);
  const router = inject(Router);

  // reconstruit l'URL demandée pour returnUrl
  const returnUrl = '/' + segments.map(s => s.path).join('/');

  // attend que ready$ soit TRUE (validation /auth/me terminée)
  return auth.ready$.pipe(
    filter(Boolean),
    take(1),
    map((): boolean | UrlTree =>
      auth.isLoggedIn()
        ? true
        : router.createUrlTree(['/sign-in'], { queryParams: { returnUrl } })
    )
  );
};
