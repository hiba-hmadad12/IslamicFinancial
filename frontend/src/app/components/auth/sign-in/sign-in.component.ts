import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink], // standalone imports
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent {
  submitting = false;
  registered = false;

  form: ReturnType<FormBuilder['group']>;

  private redirectTo: string | null = null;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });

    this.registered = this.route.snapshot.queryParamMap.get('registered') === '1';
    
  }

  async onSubmit() {
    if (this.form.invalid) return;
    this.submitting = true;

    const ok = await this.auth.login(
      this.form.value.email!,
      this.form.value.password!
    );

    this.submitting = false;
    if (ok) {
      await this.router.navigate([this.redirectTo || '/']);
    } else {
      alert('Login failed (demo).');
    }
  }
}
