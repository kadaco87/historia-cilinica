import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AntecedentesClinicosComponent } from './antecedentes-clinicos.component';

describe('AntecedentesClinicosComponent', () => {
  let component: AntecedentesClinicosComponent;
  let fixture: ComponentFixture<AntecedentesClinicosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AntecedentesClinicosComponent]
    });
    fixture = TestBed.createComponent(AntecedentesClinicosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
