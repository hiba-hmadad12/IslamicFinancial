import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, Router, Navigation } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';

/** ratios in decimals: 0.032 = 3.2% */
type Ratios = { nonPermissibleRevenue: number; cash: number; debt: number; };
type Company = { id: number; name: string; sector: string; country: string; ratios: Ratios; };
type Thresholds = { revenue: number; cash: number; debt: number; };
type RuleRow = {
  key: 'revenue' | 'cash' | 'debt';
  label: string;
  value: number;
  zoyaLimit: number; zoyaPass: boolean;
  rajhiLimit: number; rajhiPass: boolean;
};

@Component({
  selector: 'app-organisme-details',
  templateUrl: './organisme-details.component.html',
  styleUrls: ['./organisme-details.component.scss']
  // ⛔ remove `imports: [NgFor, NgIf]` here (not needed)
})
export class OrganismeDetailsComponent implements OnInit {
  id!: string | null;
  company: Company | null = null;
  rules: RuleRow[] = [];
  zoyaOverall = 0;
  rajhiOverall = 0;

  private readonly ZOYA:  Thresholds = { revenue: 0.05, cash: 0.30, debt: 0.30 };
  private readonly RAJHI: Thresholds = { revenue: 0.05, cash: 0.25, debt: 0.25 };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    // 1) id from URL
    this.id = this.route.snapshot.paramMap.get('id');

    // 2) SSR-safe read of navigation state (works only in browser)
    let fromState: Partial<Company> | undefined;
    if (isPlatformBrowser(this.platformId)) {
      const nav: Navigation | null = this.router.getCurrentNavigation();
      fromState = (nav?.extras?.state as { company?: Partial<Company> })?.company;
    }

    // 3) demo data by id (so refresh/direct link works)
    const full = this.fallbackById(Number(this.id));
    if (full) {
      this.company = { ...full, ...(fromState ?? {}) };
      this.rules = this.buildRules(this.company);
      this.computeOverall();
    }
  }

  private fallbackById(id: number): Company | null {
    const map: Record<number, Company> = {
      1: { id: 1, name: 'BNP Paribas', sector: 'Bancaire',   country: 'France',    ratios: { nonPermissibleRevenue: 0.032, cash: 0.18, debt: 0.22 } },
      2: { id: 2, name: 'Société Générale', sector: 'Bancaire', country: 'France', ratios: { nonPermissibleRevenue: 0.028, cash: 0.20, debt: 0.29 } },
      3: { id: 3, name: 'Renault', sector: 'Automobile',     country: 'France',    ratios: { nonPermissibleRevenue: 0.012, cash: 0.12, debt: 0.11 } },
      4: { id: 4, name: 'Siemens', sector: 'Technologie',    country: 'Allemagne', ratios: { nonPermissibleRevenue: 0.008, cash: 0.28, debt: 0.27 } },
      5: { id: 5, name: 'Toyota',  sector: 'Automobile',     country: 'Japon',     ratios: { nonPermissibleRevenue: 0.015, cash: 0.22, debt: 0.18 } },
    };
    return map[id] ?? null;
  }

  private buildRules(c: Company): RuleRow[] {
    const r = c.ratios;
    const mk = (key: RuleRow['key'], label: string, value: number): RuleRow => ({
      key, label, value,
      zoyaLimit: this.ZOYA[key === 'revenue' ? 'revenue' : key],
      zoyaPass:  value <= this.ZOYA[key === 'revenue' ? 'revenue' : key],
      rajhiLimit:this.RAJHI[key === 'revenue' ? 'revenue' : key],
      rajhiPass: value <= this.RAJHI[key === 'revenue' ? 'revenue' : key],
    });
    return [
      mk('revenue', 'Revenus non conformes', r.nonPermissibleRevenue),
      mk('cash',    'Ratio de trésorerie (cash)', r.cash),
      mk('debt',    'Ratio d’endettement', r.debt),
    ];
  }

  private computeOverall() {
    const score = (limitKey: 'zoyaLimit' | 'rajhiLimit') => {
      const parts = this.rules.map(row => 1 - Math.min(1, row.value / row[limitKey]));
      return Math.round((parts.reduce((a,b)=>a+b,0) / parts.length) * 100);
    };
    this.zoyaOverall = score('zoyaLimit');
    this.rajhiOverall = score('rajhiLimit');
  }

  percent(x: number, d = 1) { return (x * 100).toFixed(d) + '%'; }
  yesNo(b: boolean) { return b ? 'Pass' : 'Fail'; }
}
