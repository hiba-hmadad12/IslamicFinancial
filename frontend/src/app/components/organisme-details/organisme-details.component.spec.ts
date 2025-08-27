import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganismeDetailsComponent } from './organisme-details.component';

describe('OrganismeDetailsComponent', () => {
  let component: OrganismeDetailsComponent;
  let fixture: ComponentFixture<OrganismeDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrganismeDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrganismeDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
