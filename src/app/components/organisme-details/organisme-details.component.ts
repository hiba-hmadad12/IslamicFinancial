import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Regle, Organisme } from '../../models/organisme.model';
import { OrganismeService } from '../../services/organisme.service';

import { ChartOptions, ChartType } from 'chart.js';

@Component({
  selector: 'app-organisme-details',
  templateUrl: './organisme-details.component.html',
  styleUrls: ['./organisme-details.component.scss']
})
export class OrganismeDetailsComponent implements OnInit {
  organisme?: Organisme;

  public pieChartOptions: ChartOptions = {
    responsive: true,
  };
  public pieChartLabels = ['Halal', 'Non-Halal'];
  public pieChartData: number[] = [0, 0];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;

  constructor(
    private route: ActivatedRoute,
    private organismeService: OrganismeService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.organismeService.getOrganismes().subscribe((data: Organisme[]) => {
      this.organisme = data.find(org => org.id === id);
      if (this.organisme) {
        this.updateChartData();
      }
    });
  }

  updateChartData(): void {
    if (!this.organisme) return;

    const halal = this.getPourcentageHalal(this.organisme);
    const nonHalal = this.getPourcentageNonHalal(this.organisme);
    this.pieChartData = [halal, nonHalal];
  }

  getPourcentageHalal(org: Organisme): number {
    if (!org.regles || org.regles.length === 0) return 0;
    const total = org.regles.reduce((sum: number, r: Regle) => sum + r.tauxHalal, 0);
    return Math.round(total / org.regles.length);
  }

  getPourcentageNonHalal(org: Organisme): number {
    if (!org.regles || org.regles.length === 0) return 0;
    const total = org.regles.reduce((sum: number, r: Regle) => sum + r.tauxNonHalal, 0);
    return Math.round(total / org.regles.length);
  }

}

