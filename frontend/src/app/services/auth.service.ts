import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/api/auth'; // adapte à ton backend
  private tokenKey = 'auth_token';

  constructor(private http: HttpClient) {}

  // Login
  login(request: { email: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, request);
  }

  // Signup
  signup(request: { email: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/signup`, request);
  }

  // Sauvegarder le token
  saveToken(token: string) {
    localStorage.setItem(this.tokenKey, token);
  }

  // Récupérer le token
  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  // Déconnexion
  logout() {
    localStorage.removeItem(this.tokenKey);
  }
}
