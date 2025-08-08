import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Organisme } from '../models/organisme.model';

@Injectable({
  providedIn: 'root',
})
export class OrganismeService {
  constructor(private http: HttpClient) {}

  getOrganismes(): Observable<Organisme[]> {
    return this.http.get<Organisme[]>('assets/data.json');
  }
}
