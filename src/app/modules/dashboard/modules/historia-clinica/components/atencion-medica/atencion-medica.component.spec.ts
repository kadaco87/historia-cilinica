import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AtencionMedicaComponent } from './atencion-medica.component';

describe('AtencionMedicaComponent', () => {
  let component: AtencionMedicaComponent;
  let fixture: ComponentFixture<AtencionMedicaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AtencionMedicaComponent]
    });
    fixture = TestBed.createComponent(AtencionMedicaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
