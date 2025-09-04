// pages/companies/add-company.component.ts
import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CompaniesService } from '../../services/companies.service';
import { firstValueFrom } from 'rxjs';

@Component({
  standalone: true,
  selector: 'app-add-company',
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <h2>Add company</h2>
    <form [formGroup]="form" (ngSubmit)="onSubmit()">
      <label>Nom<input formControlName="name"></label>
      <label>Symbole<input formControlName="symbol"></label>
      <label>Secteur<input formControlName="sector"></label>
      <label>Pays<input formControlName="country"></label>
      <button type="submit" [disabled]="form.invalid || submitting">{{ submitting ? 'Saving…' : 'Save' }}</button>
      <div *ngIf="error" class="error">{{ error }}</div>
    </form>
  `,
})
export class AddCompanyComponent {
  submitting = false;
  error: string | null = null;

  form: any;

  constructor(private fb: FormBuilder, private svc: CompaniesService, private router: Router) {
    this.form = this.fb.group({
      name: ['', [Validators.required]],
      symbol: ['', [Validators.required]],
      sector: [''],
      country: [''],
    });
  }

  async onSubmit() {
    if (this.form.invalid) return;
    this.submitting = true; this.error = null;
    try {
      await firstValueFrom(this.svc.createCompany(this.form.getRawValue() as any));
      this.router.navigateByUrl('/graphs');
    } catch (e:any) {
      this.error = e?.status === 409 ? 'Symbole déjà utilisé.' : 'Erreur lors de la création.';
      console.error(e);
    } finally {
      this.submitting = false;
    }
  }
}
