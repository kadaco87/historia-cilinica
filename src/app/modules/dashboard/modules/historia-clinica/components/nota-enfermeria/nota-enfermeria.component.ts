import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";


@Component({
  selector: 'app-nota-enfermeria',
  templateUrl: './nota-enfermeria.component.html',
  styleUrls: ['./nota-enfermeria.component.scss']
})
export class NotaEnfermeriaComponent implements OnInit {
  formularioNotaEnfermeria!: FormGroup;


  constructor(private readonly fb: FormBuilder) {

  }

  ngOnInit(): void {
    this.formularioNotaEnfermeria = this.fb.group({
      temporalidad: new FormControl('1', []),
      nota: new FormControl('', []),
    })

    const modal = document.querySelector('#plantillaTextoModal');
    console.log(modal);
  }

  enviarFormulario() {
    console.log(this.formularioNotaEnfermeria.value)
  }
}
