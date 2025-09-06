export type HalalStatus = 'HALAL' | 'HARAM' | 'MIXED' | 'UNKNOWN';

export interface ScreeningSnapshot {
  companyId: number;
  source: string;
  fetchedAt?: string;          // ISO string
  status: HalalStatus;

  // valeurs possibles null/undefined côté basic -> UI affiche N/A
  haramRevenuePct?: number;    // 0..1
  interestDebtPct?: number;
  interestIncomePct?: number;
  cashAndInterestPct?: number;

  purificationRatio?: number;  
   compliantRevenuePct?: number;

  notes?: string;
}
