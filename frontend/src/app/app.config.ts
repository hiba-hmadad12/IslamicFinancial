import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';

import { routes } from './app.routes';
import { AuthInterceptor } from './interceptor/auth.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    // Amélioration des performances avec zone.js
    provideZoneChangeDetection({ eventCoalescing: true }),

    // Configuration du router
    provideRouter(routes),

    // HttpClient avec intercepteurs Angular DI
    provideHttpClient(withInterceptorsFromDi()),


    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    provideClientHydration(withEventReplay())
  ]
};
