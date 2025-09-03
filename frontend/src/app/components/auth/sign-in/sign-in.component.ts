import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent {
  submitting = false;
  registered = false;

  form: FormGroup;
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

  onSubmit() {
    if (this.form.invalid) return;
    this.submitting = true;

    const request = {
      email: this.form.value.email,
      password: this.form.value.password,
    };

    this.auth.login(request).subscribe({
      next: (response: any) => {
        this.submitting = false;
        if (response && response.token) {
          this.auth.saveToken(response.token); // Sauvegarde du JWT
          this.router.navigate([this.redirectTo || '/']);
        } else {
          alert('Login failed: no token received.');
        }
      },
      error: () => {
        this.submitting = false;
        alert('Login failed: invalid credentials.');
      }
    });
  }
}
