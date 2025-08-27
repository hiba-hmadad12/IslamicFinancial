import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CompanyModel } from '../models/companies.model'; // 👈 adapte le chemin

@Injectable({ providedIn: 'root' })
export class CompaniesService {
  private apiUrl = 'http://localhost:8080/api/companies'; // ou environment.apiUrl

  constructor(private http: HttpClient) {}

  getCompanies(): Observable<CompanyModel[]> {
    return this.http.get<CompanyModel[]>(this.apiUrl);
  }

  getCompany(id: number): Observable<CompanyModel> {
    return this.http.get<CompanyModel>(`${this.apiUrl}/${id}`);
  }
}
