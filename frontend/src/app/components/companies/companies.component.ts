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

    // Données mockées pour le développement (en attendant l'endpoint public)
    const mockCompanies: CompanyModel[] = [
      {
        id: 1,
        name: 'Al Rajhi Bank',
        symbol: '1120.SR',
        sector: 'Banking',
        country: 'Saudi Arabia'
      },
      {
        id: 2,
        name: 'Kuwait Finance House',
        symbol: 'KFH.KW',
        sector: 'Banking',
        country: 'Kuwait'
      },
      {
        id: 3,
        name: 'Dubai Islamic Bank',
        symbol: 'DIB.DU',
        sector: 'Banking',
        country: 'UAE'
      },
      {
        id: 4,
        name: 'Qatar Islamic Bank',
        symbol: 'QIBK.QA',
        sector: 'Banking',
        country: 'Qatar'
      },
      {
        id: 5,
        name: 'Bank Islam Malaysia',
        symbol: '5258.KL',
        sector: 'Banking',
        country: 'Malaysia'
      },
      {
        id: 6,
        name: 'Al Baraka Bank',
        symbol: 'BARKA.BH',
        sector: 'Banking',
        country: 'Bahrain'
      }
    ];

    // Simuler un délai de chargement
    setTimeout(() => {
      this.companies = mockCompanies;
      this.loading = false;
    }, 1000);

    // Code original pour l'API (à décommenter quand l'endpoint public sera disponible)
    /*
    this.companiesSvc.getCompanies().subscribe({
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
    */
  }

  goToDetails(company: CompanyModel) {
    if (!company?.id) return;
    this.router.navigate(['/organisme-details', company.id], { state: { company } });
  }

  trackById(_i: number, company: CompanyModel) { 
    return company.id; 
  }
}