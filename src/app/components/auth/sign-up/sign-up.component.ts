import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { CommonModule } from '@angular/common';

function matchPasswordValidator(group: AbstractControl): ValidationErrors | null {
  const pwd = group.get('password')?.value;
  const confirm = group.get('confirm')?.value;
  return pwd && confirm && pwd !== confirm ? { mismatch: true } : null;
}

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

  form: any;

  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router) {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      passwords: this.fb.group({
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirm: ['', Validators.required],
      }, { validators: matchPasswordValidator }),
    });
  }

  async onSubmit() {
    this.existsError = false;
    if (this.form.invalid) return;
    this.submitting = true;

    const { name, email, passwords } = this.form.value;
    const res = this.auth.register(name!, email!, passwords!.password!);

    this.submitting = false;
    if (res.ok) {
      // redirect to sign-in with a little success flag
      this.router.navigate(['/sign-in'], { queryParams: { registered: 1 } });
    } else if (res.reason === 'exists') {
      this.existsError = true;
    }
  }

  // helpers for template
  get f() { return this.form.controls; }
  get pGroup() { return this.form.controls['passwords']; }
}
