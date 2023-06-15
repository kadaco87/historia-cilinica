import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalUsarPlantillaNotaComponent } from './modal-usar-plantilla-nota.component';

describe('ModalUsarPlantillaNotaComponent', () => {
  let component: ModalUsarPlantillaNotaComponent;
  let fixture: ComponentFixture<ModalUsarPlantillaNotaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalUsarPlantillaNotaComponent]
    });
    fixture = TestBed.createComponent(ModalUsarPlantillaNotaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
