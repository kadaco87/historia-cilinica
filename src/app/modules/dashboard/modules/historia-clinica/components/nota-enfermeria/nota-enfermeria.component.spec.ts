import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotaEnfermeriaComponent } from './nota-enfermeria.component';

describe('NotaEnfermeriaComponent', () => {
  let component: NotaEnfermeriaComponent;
  let fixture: ComponentFixture<NotaEnfermeriaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NotaEnfermeriaComponent]
    });
    fixture = TestBed.createComponent(NotaEnfermeriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
