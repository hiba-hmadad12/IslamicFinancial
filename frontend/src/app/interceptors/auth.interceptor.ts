// src/app/interceptors/auth.interceptor.ts
import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const isBrowser = isPlatformBrowser(this.platformId);
    const isApi = req.url.startsWith(environment.apiUrl);

    if (isBrowser && isApi) {
      const token = localStorage.getItem('basicAuth');
      if (token) {
        req = req.clone({ setHeaders: { Authorization: `Basic ${token}` } });
      }
    }
    console.log('[HTTP]', req.method, req.url, req.headers.get('Authorization'));
    return next.handle(req);
  }
}
