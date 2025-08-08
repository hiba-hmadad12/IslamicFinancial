import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Organisme } from '../../models/organisme.model';
import { OrganismeService } from '../../services/organisme.service';

@Component({
  selector: 'app-organisme-list',
  templateUrl: './organisme-list.component.html',
  styleUrls: ['./organisme-list.component.scss'],
})
export class OrganismeListComponent implements OnInit {
  organismes: Organisme[] = [];

  constructor(
    private organismeService: OrganismeService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.organismeService.getOrganismes().subscribe((data) => {
      this.organismes = data;
    });
  }

  viewDetails(org: Organisme): void {
    this.router.navigate(['/details', org.id]);
  }

  // 🔢 Calcul du taux moyen Halal
  getPourcentageHalal(org: Organisme): number {
    if (!org.regles || org.regles.length === 0) return 0;
    const total = org.regles.reduce((sum, regle) => sum + regle.tauxHalal, 0);
    return Math.round(total / org.regles.length);
  }

  // 🔢 Calcul du taux moyen Non-Halal
  getPourcentageNonHalal(org: Organisme): number {
    if (!org.regles || org.regles.length === 0) return 0;
    const total = org.regles.reduce((sum, regle) => sum + regle.tauxNonHalal, 0);
    return Math.round(total / org.regles.length);
  }
}
