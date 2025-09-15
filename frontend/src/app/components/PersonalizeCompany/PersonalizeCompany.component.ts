import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CompaniesService } from '../../services/companies.service';
import { firstValueFrom } from 'rxjs';

@Component({
  standalone: true,
  selector: 'app-personalize-company',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './personalizecompany.component.html',
  styleUrls: ['./personalizecompany.component.css'],
})
export class PersonalizeCompanyComponent {
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
