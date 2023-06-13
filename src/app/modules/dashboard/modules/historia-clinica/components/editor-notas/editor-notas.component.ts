import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-editor-notas',
  templateUrl: './editor-notas.component.html',
  styleUrls: ['./editor-notas.component.scss']
})
export class EditorNotasComponent implements OnInit {
  formEditor!: FormGroup;
  constructor(private readonly fb: FormBuilder) {

  }
  ngOnInit(): void {
    this.formEditor = this.fb.group({
      text: new FormControl('', [])
    })
  }
}
