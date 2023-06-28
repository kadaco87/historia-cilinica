import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";


@Component({
  selector: 'app-nota-enfermeria',
  templateUrl: './nota-enfermeria.component.html',
  styleUrls: ['./nota-enfermeria.component.scss']
})
export class NotaEnfermeriaComponent implements OnInit {
  formularioNotaEnfermeria!: FormGroup;
  listaNotas: any[] = [];


  constructor(private readonly fb: FormBuilder) {

  }

  ngOnInit(): void {
    this.initForm();

    const modal = document.querySelector('#plantillaTextoModal');
    console.log(modal);
  }

  initForm() {
    this.formularioNotaEnfermeria = this.fb.group({
      temporalidad: new FormControl('1', [Validators.required]),
      nota: new FormControl('', [Validators.required]),
    })
  }

  get temporalidad() {
    return this.formularioNotaEnfermeria.get('temporalidad');
  }

  get nota() {
    return this.formularioNotaEnfermeria.get('nota');
  }

  enviarFormulario() {
    if (this.formularioNotaEnfermeria.valid) {
      console.log(this.formularioNotaEnfermeria.value);
      const fecha = new Date(Date.now());
      this.listaNotas.push({...this.formularioNotaEnfermeria.value, id: fecha.valueOf(), notasAclaratorias: []});
      this.formularioNotaEnfermeria.reset();
      this.initForm();
    } else {
      alert('pilas')
      this.formularioNotaEnfermeria.markAllAsTouched();
    }
  }

  nombreTemporalidadPorCodigo(codigo: string) {
    let nombreTemporalidad = 'Primera vez';
    switch(Number(codigo)) {
      case 1:
        nombreTemporalidad = 'Primera vez';
        break;
      case 2:
        nombreTemporalidad = 'Control';
        break;
    }
    return nombreTemporalidad
  }

  recibirDataFormularioModal(event: any) {
    console.log('event: ', event);
    const index = this.listaNotas.findIndex(nota => nota.id === event.idNota)
    delete event.idNota;
    this.listaNotas[index].notasAclaratorias.push(event)
  }
}
