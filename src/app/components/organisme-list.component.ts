import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Organisme } from '../models/organisme.model';
import { OrganismeService } from '../services/organisme.service';

@Component({
  selector: 'app-organisme-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './organisme-list.component.html',
  styleUrls: ['./organisme-list.component.scss']
})
export class OrganismeListComponent implements OnInit {
  organismes: Organisme[] = [];

  constructor(private organismeService: OrganismeService) {}

  ngOnInit(): void {
    this.organismeService.getOrganismes().subscribe((data: Organisme[]) => {
      this.organismes = data;
    });
  }
}
