import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-organisme-details',
  templateUrl: './organisme-details.component.html',
  styleUrls: ['./organisme-details.component.scss']
})
export class OrganismeDetailsComponent implements OnInit {
  id!: string;
  company: any = null;
  rules: any[] = [];

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id') || '';
    this.loadData();
  }

  loadData() {
    this.http.get<any[]>('assets/data.json').subscribe(data => {
      this.company = data.find(c => c.id === this.id) || null;
      this.rules = this.company ? this.company.rules : [];
      console.log('company:', this.company);
      console.log('rules:', this.rules);
    });
  }

  percent(value: number): string {
    return (value * 100).toFixed(2) + '%';
  }
}
