// src/app/interceptors/auth.interceptor.ts
import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private router: Router,
    private auth: AuthService
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // 🚫 Pas d'auth côté SSR
    if (!isPlatformBrowser(this.platformId)) {
      return next.handle(req);
    }

    // ✅ Ne cible que ton backend
    const apiBase = (environment.apiUrl || '').replace(/\/+$/, ''); // trim trailing slash
    const isApiAbsolute = apiBase && req.url.startsWith(apiBase);
    const isApiRelative = req.url.startsWith('/api');
    const isApi = isApiAbsolute || isApiRelative;

    let request = req;

    if (isApi) {
      const token = this.auth.getBasicToken(); // lit la même clé que le service
      // ⚠️ N'ajoute pas si un Authorization est déjà défini (ex: clé Zoya)
      if (token && !req.headers.has('Authorization')) {
        request = req.clone({
          setHeaders: { Authorization: `Basic ${token}` },
        });
      }
    }

    return next.handle(request).pipe(
      catchError((err: HttpErrorResponse) => {
        if (err.status === 401) {
          // 401 -> token invalide/expiré : purge + redirection propre
          this.auth.logout(false);
          const currentUrl = this.router.url;
          if (!currentUrl.startsWith('/sign-in')) {
            this.router.navigate(['/sign-in'], { queryParams: { returnUrl: currentUrl } });
          }
        }
        return throwError(() => err);
      })
    );
  }
}
