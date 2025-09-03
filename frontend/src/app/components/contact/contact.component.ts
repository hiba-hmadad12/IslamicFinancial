import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent {
  contactForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.contactForm = this.fb.group({
      sujet: ['', Validators.required],
      prenom: ['', Validators.required],
      nom: ['', Validators.required],
      dateNaissance: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      pays: ['', Validators.required],
      telephone: ['', [Validators.required, Validators.pattern(/^[0-9]{10,15}$/)]],
      ville: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.contactForm.valid) {
      console.log('Formulaire envoyé ✅', this.contactForm.value);
    }
  }
}
