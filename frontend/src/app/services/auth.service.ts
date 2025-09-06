// src/app/services/auth.service.ts
import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, map, tap } from 'rxjs';
import { environment } from '../../environments/environment';

export interface UserDto {
  id: number; email: string; role: string;
  firstName?: string; lastName?: string; enabled: boolean;
}
export interface RegisterRequest {
  email: string; password: string; firstName?: string; lastName?: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly base = environment.apiUrl;   // e.g. http://localhost:8080/api
  private readonly key  = 'basicAuth';
  private readonly isBrowser: boolean;

  /** CHANGEMENT #1: on dérive l'état d'auth depuis l'utilisateur (et pas juste le token) */
  currentUser$ = new BehaviorSubject<UserDto | null>(null);

  /** Optionnel: savoir si la (re)validation au boot est finie */
  readonly ready$ = new BehaviorSubject<boolean>(false);

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(platformId);

    if (this.isBrowser) {
      const token = localStorage.getItem(this.key);
      if (token) {
        // Valide le token au démarrage (pas "connecté" tant que pas confirmé)
        const headers = new HttpHeaders({ Authorization: `Basic ${token}` });
        this.http.get<UserDto>(`${this.base}/auth/me`, { headers }).subscribe({
          next: u => {
            this.currentUser$.next(u);
            this.ready$.next(true);
          },
          error: () => {
            this.logout(false);     // purge silencieuse si invalide
            this.ready$.next(true);
          }
        });
      } else {
        this.ready$.next(true);
      }
    } else {
      this.ready$.next(true);
    }
  }

  register(payload: RegisterRequest) {
    return this.http.post<UserDto>(`${this.base}/auth/register`, payload);
  }

  login(email: string, password: string) {
    const e = (email ?? '').trim();
    const p = (password ?? '').trim();
    const token = btoa(`${e}:${p}`);
    const headers = new HttpHeaders({ Authorization: `Basic ${token}` });

    // On NE sauvegarde le token que si /auth/me réussit
    return this.http.get<UserDto>(`${this.base}/auth/me`, { headers }).pipe(
      tap(user => {
        if (this.isBrowser) {
          localStorage.setItem(this.key, token);
        }
        this.currentUser$.next(user);
      }),
      map(() => true)
    );
  }

  logout(withRedirect = false) {
    if (this.isBrowser) localStorage.removeItem(this.key);
    this.currentUser$.next(null);

    // Redirection désactivée par défaut ici (on gérera plus tard côté guard/interceptor)
    // if (withRedirect) { ... }
  }

  /** Header prêt à l'emploi pour d'autres services */
  getAuthHeaders(): HttpHeaders | null {
    const t = this.getBasicToken();
    return t ? new HttpHeaders({ Authorization: `Basic ${t}` }) : null;
  }

  getBasicToken(): string | null {
    return this.isBrowser ? localStorage.getItem(this.key) : null;
  }

  /** CHANGEMENT #2: "connecté" = utilisateur connu, pas seulement un token dans le storage */
  isLoggedIn(): boolean {
    return !!this.currentUser$.value;
  }
}
