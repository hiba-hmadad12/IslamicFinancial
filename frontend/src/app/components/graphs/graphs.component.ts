import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { map } from 'rxjs/operators';

import { CompaniesService } from '../../services/companies.service';
import { CompanyModel } from '../../models/companies.model';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-graphs',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './graphs.component.html',
  styleUrls: ['./graphs.component.css']
})
export class GraphsComponent implements OnInit {
  companies: CompanyModel[] = [];
  loading = false;
  error: string | null = null;

  // Admin-only UI flag
  isAdmin$!: import('rxjs').Observable<boolean>;

  constructor(
    private router: Router,
    private companiesSvc: CompaniesService,
    private auth: AuthService
  ) {}

  ngOnInit(): void {
    this.loading = true;
    this.error = null;

    // Initialize isAdmin$ after auth is available
    this.isAdmin$ = this.auth.currentUser$.pipe(map(u => u?.role === 'ADMIN'));

    this.companiesSvc.getCompanies().subscribe({
      next: (data) => { this.companies = data ?? []; this.loading = false; },
      error: (e) => { console.error(e); this.error = 'Impossible de charger les entreprises.'; this.loading = false; }
    });
  }

  goToDetails(company: CompanyModel) {
    if (!company?.id) return;
    this.router.navigate(['/organisme-details', company.id], { state: { company } });
  }

  addCompany() {
    // change the route if your form path is different
    this.router.navigate(['/companies/new']);
  }

  trackById(_i: number, c: CompanyModel) { return c.id; }
}
