import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../services/auth.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent {
  form!: FormGroup;

  submitting = false;
  error: string | null = null;
  justRegistered = false;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
    this.route.queryParamMap.subscribe(p => this.justRegistered = p.has('registered'));
  }

  async onSubmit() {
    this.error = null;
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.submitting = true;

    const { email, password } = this.form.value as any;

    try {
      await firstValueFrom(this.auth.login(email, password)); // AuthService stores Basic token
      await this.router.navigate(['/graphs']);             // change route as needed
    } catch (err: any) {
      this.error = 'Invalid email or password';
      console.error(err);
    } finally {
      this.submitting = false;
    }
  }

  get f() { return this.form.controls; }
}
