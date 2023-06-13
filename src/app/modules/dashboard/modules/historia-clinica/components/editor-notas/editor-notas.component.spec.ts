import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditorNotasComponent } from './editor-notas.component';

describe('EditorNotasComponent', () => {
  let component: EditorNotasComponent;
  let fixture: ComponentFixture<EditorNotasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditorNotasComponent]
    });
    fixture = TestBed.createComponent(EditorNotasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
