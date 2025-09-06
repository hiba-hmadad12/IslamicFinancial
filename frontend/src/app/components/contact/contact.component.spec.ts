import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ContactComponent } from './contact.component';

describe('ContactComponent (HalalInvest)', () => {
  let component: ContactComponent;
  let fixture: ComponentFixture<ContactComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ContactComponent],
      imports: [ReactiveFormsModule]
    }).compileComponents();

    fixture = TestBed.createComponent(ContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('form should be invalid when empty', () => {
    expect(component.contactForm.valid).toBeFalsy();
  });

  it('form should be valid when filled correctly', () => {
    component.contactForm.setValue({
      sujet: 'avis',
      prenom: 'John',
      nom: 'Doe',
      dateNaissance: '1995-05-10',
      email: 'john@example.com',
      pays: 'morocco',
      telephone: '0612345678',
      ville: 'Casablanca'
    });
    expect(component.contactForm.valid).toBeTruthy();
  });
});
