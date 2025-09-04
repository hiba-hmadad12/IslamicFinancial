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

  currentUser$ = new BehaviorSubject<UserDto | null>(null);

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(platformId);

    // Only touch localStorage in the browser
    if (this.isBrowser) {
      const token = localStorage.getItem(this.key);
      if (token) {
        this.http.get<UserDto>(`${this.base}/auth/me`, {
          headers: new HttpHeaders({ Authorization: `Basic ${token}` })
        }).subscribe({
          next: u => this.currentUser$.next(u),
          error: () => this.logout()
        });
      }
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

    return this.http.get<UserDto>(`${this.base}/auth/me`, { headers }).pipe(
      tap(user => {
        if (this.isBrowser) {
          localStorage.setItem(this.key, token);     // save only in browser
        }
        this.currentUser$.next(user);
      }),
      map(() => true)
    );
  }

  logout() {
    if (this.isBrowser) localStorage.removeItem(this.key);
    this.currentUser$.next(null);
  }

  getBasicToken(): string | null {
    return this.isBrowser ? localStorage.getItem(this.key) : null;
  }

  isLoggedIn(): boolean {
    return !!this.getBasicToken();
  }
}
