import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { CompaniesService } from '../../services/companies.service';
import { ScreeningSnapshot } from '../../models/snapshot.model';
import { CompanyModel } from '../../models/companies.model';

@Component({
  selector: 'app-organisme-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './organisme-details.component.html',
  styleUrls: ['./organisme-details.component.scss']
})
export class OrganismeDetailsComponent implements OnInit {
  companyId!: number;

  // NEW
  company?: CompanyModel;
  companyLoading = false;

  snapshot?: ScreeningSnapshot;
  loading = false;
  error?: string;

  constructor(private route: ActivatedRoute, private api: CompaniesService) {}

  ngOnInit(): void {
    this.companyId = Number(this.route.snapshot.paramMap.get('id'));

    // NEW: charge les infos de la company (name, symbol)
    this.loadCompany();

    // existant: charge le snapshot
    this.loadLatest();
  }

  // NEW
  loadCompany(): void {
    if (!this.companyId) return;
    this.companyLoading = true;
    this.api.getCompany(this.companyId).subscribe({
      next: c => { this.company = c; this.companyLoading = false; },
      error: () => { this.companyLoading = false; } // on laisse le fallback nom#id
    });
  }

  loadLatest(): void {
    this.loading = true;
    this.api.getLatestSnapshot(this.companyId, 'ZOYA').subscribe({
      next: s => { this.snapshot = s; this.loading = false; },
      error: () => { this.error = 'Aucun snapshot'; this.loading = false; }
    });
  }

  refreshNow(): void {
    this.loading = true;
    this.api.refreshSnapshot(this.companyId, 'ZOYA').subscribe({
      next: s => { this.snapshot = s; this.loading = false; },
      error: () => { this.error = 'Refresh échoué'; this.loading = false; }
    });
  }

  // Helpers d'affichage
  pct(x?: number | null): string {
    if (x === null || x === undefined) return 'N/A';
    return (x <= 1 ? x * 100 : x).toFixed(2) + ' %';
  }

  width(x?: number | null): number {
    if (x === null || x === undefined) return 0;
    const v = x <= 1 ? x * 100 : x;
    return Math.max(0, Math.min(100, v));
  }
}
