import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalCrearPlantillaNotaComponent } from './modal-crear-plantilla-nota.component';

describe('ModalCrearPlantillaNotaComponent', () => {
  let component: ModalCrearPlantillaNotaComponent;
  let fixture: ComponentFixture<ModalCrearPlantillaNotaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalCrearPlantillaNotaComponent]
    });
    fixture = TestBed.createComponent(ModalCrearPlantillaNotaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
