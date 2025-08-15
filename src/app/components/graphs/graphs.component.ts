import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-graphs',
  templateUrl: './graphs.component.html',
  styleUrls: ['./graphs.component.css']
})
export class GraphsComponent { constructor(private router: Router) {}

  goToDetails(company: { id: number; name: string; sector: string; country: string }) {
    this.router.navigate(['/organisme-details', company.id], { state: { company } });
  }}
