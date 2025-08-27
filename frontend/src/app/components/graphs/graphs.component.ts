import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { CompaniesService } from '../../services/companies.service';
import { CompanyModel } from '../../models/companies.model';

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
  error?: string;

  constructor(private router: Router, private companiesSvc: CompaniesService) {}

  ngOnInit(): void {
    this.loading = true;
    this.companiesSvc.getCompanies().subscribe({
      next: (data) => { this.companies = data; this.loading = false; },
      error: () => { this.error = 'Impossible de charger les entreprises.'; this.loading = false; }
    });
  }

  goToDetails(company: CompanyModel) {
    this.router.navigate(['/organisme-details', company.id], { state: { company } });
  }

  trackById(_i: number, c: CompanyModel) { return c.id; }
}
