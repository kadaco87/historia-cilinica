import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatosPersonalesPacienteComponent } from './datos-personales-paciente.component';

describe('DatosPersonalesPacienteComponent', () => {
  let component: DatosPersonalesPacienteComponent;
  let fixture: ComponentFixture<DatosPersonalesPacienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DatosPersonalesPacienteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DatosPersonalesPacienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
