import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoriaClinicaLayoutComponent } from './historia-clinica-layout.component';

describe('HistoriaClinicaLayoutComponent', () => {
  let component: HistoriaClinicaLayoutComponent;
  let fixture: ComponentFixture<HistoriaClinicaLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HistoriaClinicaLayoutComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HistoriaClinicaLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
