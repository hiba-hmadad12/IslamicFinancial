import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

type StoredUser = { name?: string; email: string; password: string };

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly TOKEN_KEY = 'auth_token';
  private readonly USER_KEY  = 'auth_user';
  private readonly USERS_KEY = 'auth_users';

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  private get canUseLS(): boolean {
    return isPlatformBrowser(this.platformId) && typeof localStorage !== 'undefined';
  }

  private readUsers(): StoredUser[] {
    if (!this.canUseLS) return [];
    try { return JSON.parse(localStorage.getItem(this.USERS_KEY) || '[]') as StoredUser[]; }
    catch { return []; }
  }
  private writeUsers(users: StoredUser[]) {
    if (!this.canUseLS) return;
    localStorage.setItem(this.USERS_KEY, JSON.stringify(users));
  }

  /** FRONT-END ONLY: store user in localStorage */
  register(name: string, email: string, password: string): { ok: boolean; reason?: 'exists' } {
    if (!this.canUseLS) return { ok: false };
    const users = this.readUsers();
    const exists = users.some(u => u.email.toLowerCase() === email.toLowerCase());
    if (exists) return { ok: false, reason: 'exists' };
    users.push({ name, email, password });
    this.writeUsers(users);
    return { ok: true };
  }

  isLoggedIn(): boolean {
    return this.canUseLS && !!localStorage.getItem(this.TOKEN_KEY);
  }

  getUserEmail(): string | null {
    if (!this.canUseLS) return null;
    const raw = localStorage.getItem(this.USER_KEY);
    try { return raw ? (JSON.parse(raw).email as string) : null; } catch { return null; }
  }

  /** FRONT-END ONLY: check email+password against stored users */
  async login(email: string, password: string): Promise<boolean> {
    if (!this.canUseLS) return false;
    const users = this.readUsers();
    const found = users.find(u => u.email.toLowerCase() === email.toLowerCase() && u.password === password);
    if (!found) return false;

    localStorage.setItem(this.TOKEN_KEY, 'demo-token');
    localStorage.setItem(this.USER_KEY, JSON.stringify({ email: found.email, name: found.name }));
    return true;
  }

  logout(): void {
    if (!this.canUseLS) return;
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.USER_KEY);
  }
}
