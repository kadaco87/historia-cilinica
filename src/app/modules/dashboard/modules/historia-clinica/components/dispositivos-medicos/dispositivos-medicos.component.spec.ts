import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DispositivosMedicosComponent } from './dispositivos-medicos.component';

describe('DispositivosMedicosComponent', () => {
  let component: DispositivosMedicosComponent;
  let fixture: ComponentFixture<DispositivosMedicosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DispositivosMedicosComponent]
    });
    fixture = TestBed.createComponent(DispositivosMedicosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
