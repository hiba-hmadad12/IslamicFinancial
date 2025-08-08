export interface Regle {
  nom: string;
  description: string;
  conformeAAOIFI: boolean;
  conformeSP: boolean;
  tauxHalal: number;
  tauxNonHalal: number;
}

export interface Organisme {
  id: number;
  nom: string;
  sources: string[];
  regles: Regle[];
}
