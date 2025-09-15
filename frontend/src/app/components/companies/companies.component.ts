import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

import { CompaniesService } from '../../services/companies.service';
import { CompanyModel } from '../../models/companies.model';

@Component({
  selector: 'app-companies',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.scss']
})
export class CompaniesComponent implements OnInit {
  companies: CompanyModel[] = [];
  loading = false;
  error: string | null = null;

  constructor(
    private router: Router,
    private companiesSvc: CompaniesService
  ) {}

  ngOnInit(): void {
    this.loadCompanies();
  }

  loadCompanies(): void {
    this.loading = true;
    this.error = null;

    this.companiesSvc.getCompaniesWithStatus().subscribe({
      next: (data) => {
        this.companies = data ?? [];
        this.loading = false;
      },
      error: (e) => {
        console.error('Erreur lors du chargement des entreprises:', e);
        this.error = 'Impossible de charger les entreprises.';
        this.loading = false;
      }
    });
  }

  goToDetails(company: CompanyModel) {
    if (!company?.id) return;
    this.router.navigate(['/organisme-details', company.id], { state: { company } });
  }

  trackById(_i: number, company: CompanyModel) {
    return company.id;
  }
}
