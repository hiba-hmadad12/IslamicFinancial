import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CompanyModel } from '../models/companies.model';
import { ScreeningSnapshot } from '../models/snapshot.model';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class CompaniesService {
  private apiUrl = environment.apiUrl + '/companies';

  constructor(private http: HttpClient) {}

  getCompanies(): Observable<CompanyModel[]> {
    return this.http.get<CompanyModel[]>(this.apiUrl);
  }
 

  getCompany(id: number): Observable<CompanyModel> {
    return this.http.get<CompanyModel>(`${this.apiUrl}/${id}`);
  }

  createCompany(payload: { name:string; symbol:string; sector?:string; country?:string }) {
    return this.http.post<CompanyModel>(`${environment.apiUrl}/companies`, payload);
  }

  /** ← NEW: dernier snapshot pour un provider (ZOYA par défaut) */
  getLatestSnapshot(companyId: number, source = 'ZOYA'): Observable<ScreeningSnapshot> {
    const params = new HttpParams().set('source', source);
    return this.http.get<ScreeningSnapshot>(`${this.apiUrl}/${companyId}/screen`, { params });
  }

  /** ← NEW: rafraîchit depuis Zoya (le backend utilisera la clé de ses properties) */
  refreshSnapshot(companyId: number, source = 'ZOYA'): Observable<ScreeningSnapshot> {
    const params = new HttpParams().set('source', source);
    return this.http.post<ScreeningSnapshot>(`${this.apiUrl}/${companyId}/screen/refresh`, null, { params });
  }
}
