import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {round} from "@popperjs/core/lib/utils/math";

@Component({
  selector: 'app-signos-vitales',
  templateUrl: './signos-vitales.component.html',
  styleUrls: ['./signos-vitales.component.scss']
})
export class SignosVitalesComponent implements OnInit {
  // las variables se declaran encima del constructor
  formularioSignosVitales!: FormGroup;
  rhs = [
    {id: 1, rh: 'A+'},
    {id: 2, rh: 'O+'},
    {id: 3, rh: 'B+'},
    {id: 4, rh: 'AB+'},
    {id: 5, rh: 'A-'},
    {id: 6, rh: 'O-'},
    {id: 7, rh: 'B-'},
    {id: 8, rh: 'AB-'}
  ]

  constructor(private readonly fb: FormBuilder) {

  }

  /* hace parte del ciclo de vida y se dispara despues que se ejecuta el constructor
  para inicializar variables del componente
  */
  ngOnInit(): void {
    this.formularioSignosVitales = this.fb.group({
      // setiar valores iniciales o sino se deja en null
      frecuenciaCardiaca: new FormControl(null, [Validators.required]),
      frecuenciaRespiratoria: new FormControl(null, [Validators.required]),
      saturacion: new FormControl(null, [Validators.required]),
      sistolica: new FormControl(null, [Validators.required]),
      diastolica: new FormControl(null, [Validators.required]),
      pam: new FormControl(0),
      temperatura: new FormControl(null, [Validators.required]),
      glasgow: new FormControl(null, [Validators.required]),
      estatura: new FormControl(null, [Validators.required]),
      peso: new FormControl(null, [Validators.required]),
      imc: new FormControl(null),
      rh: new FormControl([], [Validators.required]),
    });
  }

  calcularPam() {
    if (this.diastolica?.dirty && this.sistolica?.dirty) {
      const diastolica = Number(this.diastolica?.value || 1);
      const sistolica = Number(this.sistolica?.value || 1);
      const pam = parseInt(String((sistolica + (2 * diastolica)) / 3));
      console.log('me estoy evaluando', pam)
      this.pam?.setValue(pam);
    }
  }

  calcularImc() {
    if (this.peso?.dirty && this.estatura?.dirty) {
      const peso = Number(this.peso?.value || 1);
      const estatura = Number(this.estatura?.value || 1) / 100;
      const imc = parseInt(String((peso / (2 * estatura))))
      console.log('me estoy evaluando', `${peso} / (2 * ${estatura}) = ${imc}`)
      this.imc?.setValue(imc);
    }

  }

  get frecuenciaCardiaca() {
    return this.formularioSignosVitales.get('frecuenciaCardiaca');
  }

  get frecuenciaRespiratoria() {
    return this.formularioSignosVitales.get('frecuenciaRespiratoria');
  }

  get saturacion() {
    return this.formularioSignosVitales.get('saturacion');
  }

  get sistolica() {
    return this.formularioSignosVitales.get('sistolica')
  }

  get diastolica() {
    return this.formularioSignosVitales.get('diastolica')
  }

  get pam() {
    return this.formularioSignosVitales.get('pam')
  }

  get temperatura() {
    return this.formularioSignosVitales.get('temperatura')
  }

  get glasgow() {
    return this.formularioSignosVitales.get('glasgow')
  }

  get estatura() {
    return this.formularioSignosVitales.get('estatura')
  }

  get peso() {
    return this.formularioSignosVitales.get('peso')
  }

  get imc() {
    return this.formularioSignosVitales.get('imc')
  }

  get rh() {
    return this.formularioSignosVitales.get('rh')
  }

  enviarFormulario() {
    if (!this.formularioSignosVitales.valid) {
      this.formularioSignosVitales.markAllAsTouched();
    } else {
      console.log('se envio el formulario => ', this.formularioSignosVitales.value);

    }

  }
}
