import { Component, OnDestroy } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../services/auth.service';
import { firstValueFrom, Subscription } from 'rxjs';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnDestroy {
  form: FormGroup;
  submitting = false;
  error: string | null = null;
  justRegistered = false;
  /** ← la cible de redirection après login */
  private returnUrl = '/';
  private qpSub: Subscription;

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

    // initialise returnUrl & registered
    this.returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    this.justRegistered = this.route.snapshot.queryParamMap.has('registered');

    // garde à jour si les query params changent
    this.qpSub = this.route.queryParamMap.subscribe(qp => {
      const ru = qp.get('returnUrl');
      if (ru) this.returnUrl = ru;
      this.justRegistered = qp.has('registered');
    });
  }

  ngOnDestroy(): void {
    this.qpSub?.unsubscribe();
  }

  async onSubmit() {
    this.error = null;
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.submitting = true;

    const { email, password } = this.form.value as { email: string; password: string };

    try {
      await firstValueFrom(this.auth.login(email, password)); // stocke le Basic token
      // ⬅️ redirige vers la page demandée initialement
      await this.router.navigateByUrl(this.returnUrl);
    } catch (err) {
      this.error = 'Invalid email or password';
      console.error(err);
    } finally {
      this.submitting = false;
    }
  }

  get f() { return this.form.controls; }
}
