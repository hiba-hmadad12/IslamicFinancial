import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CompanyModel } from '../models/companies.model';
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
  // companies.service.ts
createCompany(payload: { name:string; symbol:string; sector?:string; country?:string }) {
  return this.http.post<CompanyModel>(`${environment.apiUrl}/companies`, payload);
}

}
