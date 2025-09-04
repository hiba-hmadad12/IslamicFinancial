import { Component } from '@angular/core';
import {
  ReactiveFormsModule, FormBuilder, Validators,
  AbstractControl, ValidationErrors, FormGroup, ValidatorFn
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService, RegisterRequest } from '../../../services/auth.service';
import { firstValueFrom } from 'rxjs';

const matchPasswordValidator: ValidatorFn = (group: AbstractControl): ValidationErrors | null => {
  const pwd = group.get('password')?.value;
  const confirm = group.get('confirm')?.value;
  return pwd && confirm && pwd !== confirm ? { mismatch: true } : null;
};

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, CommonModule],
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent {
  submitting = false;
  existsError = false;
  serverError: string | null = null;

  form: FormGroup;

  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router) {
    this.form = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: [''],
      email: ['', [Validators.required, Validators.email]],
      passwords: this.fb.group(
        {
          password: ['', [Validators.required, Validators.minLength(6)]],
          confirm: ['', Validators.required],
        },
        { validators: matchPasswordValidator }
      ),
    });
  }

  async onSubmit() {
    this.existsError = false;
    this.serverError = null;

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.submitting = true;

    const { firstName, lastName, email, passwords } = this.form.value as any;

    const payload: RegisterRequest = {
      email,
      password: passwords.password,
      firstName,
      lastName
    };

    try {
      await firstValueFrom(this.auth.register(payload));
      await this.router.navigate(['/sign-in'], { queryParams: { registered: 1 } });
    } catch (err: any) {
      if (err?.status === 409) this.existsError = true;          // email already taken
      else this.serverError = 'Registration failed. Please try again.';
      console.error(err);
    } finally {
      this.submitting = false;
    }
  }

  // helpers for template
  get f() { return this.form.controls; }
  get pGroup() { return this.form.get('passwords') as FormGroup; }
}
