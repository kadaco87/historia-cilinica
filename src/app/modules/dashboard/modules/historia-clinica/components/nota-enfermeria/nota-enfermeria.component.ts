import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {HistoriaClinicaService} from "../../../../../shared/services/historia-clinica.service";
import {ActivatedRoute} from "@angular/router";
import Swal from "sweetalert2";
import {NotaEnfermeriaInterface} from "../../../../../shared/models/nota-enfermeria.interface";
import {OPTIONS_SWEET_ALERT} from "../../../../../shared/utils/utils";
import {AuthService} from "../../../../../shared/services/auth.service";


@Component({
  selector: 'app-nota-enfermeria',
  templateUrl: './nota-enfermeria.component.html',
  styleUrls: ['./nota-enfermeria.component.scss']
})
export class NotaEnfermeriaComponent implements OnInit {
  formularioNotaEnfermeria!: FormGroup;
  listaNotas: NotaEnfermeriaInterface[] = [];
  defaultOptionsAlerts = OPTIONS_SWEET_ALERT;
  id: string = '';

  constructor(
    private readonly fb: FormBuilder,
    private readonly historiaClinicaService: HistoriaClinicaService,
    private readonly authService: AuthService,
    private readonly route: ActivatedRoute
  ) {

  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = params['id'] || null;
      console.log('NotaEnfermeriaComponent => this.id', this.id)
    })
    this.initForm();
    const modal = document.querySelector('#plantillaTextoModal');
    console.log(modal);
  }

  initForm() {
    this.getNotasEnfermeria();
    this.formularioNotaEnfermeria = this.fb.group({
      temporalidad: new FormControl('1', [Validators.required]),
      nota: new FormControl('', [Validators.required]),
    })
  }

  getNotasEnfermeria() {
    this.historiaClinicaService.obtenerNotasEnfermeria(this.id)
      .subscribe({
        'next': notas => {
          if(notas) {
            this.listaNotas = notas
            console.log(this.listaNotas)
          }
        },
        'error': error => console.error(error)
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
      const notaEnfermeria = {
        nota: this.nota?.value,
        patientId: this.id,
        temporalidad: Number(this.temporalidad?.value),
        date: new Date(Date.now()).valueOf(),
        notasAclaratorias: []
      }
      this.historiaClinicaService.registrarNotasEnfermeria(this.id, notaEnfermeria)
        .subscribe({
          'next': result => {
            if (result) Swal.fire({
              title: 'Advertencia!',
              text: 'Nota enfermeria registrada exitosamente',
              icon: 'success',
              confirmButtonText: 'Aceptar',
              ...this.defaultOptionsAlerts.success
            }).then(() => {
              this.formularioNotaEnfermeria.reset();
              this.formularioNotaEnfermeria.markAsUntouched();
              this.getNotasEnfermeria();
            })
          }, 'error': error => Swal.fire({
            title: 'Advertencia!',
            text: error.error.message,
            icon: 'warning',
            confirmButtonText: 'Aceptar',
            ...this.defaultOptionsAlerts.danger
          }).then(() => {
            this.formularioNotaEnfermeria.reset();
            this.formularioNotaEnfermeria.markAsUntouched();
          })
        })
    } else {
      this.formularioNotaEnfermeria.markAllAsTouched();
    }
  }

  nombreTemporalidadPorCodigo(codigo: number) {
    let nombreTemporalidad = '';
    switch (codigo) {
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
    const notaAclaratoria = {
      notaAclaratoria: event.notaAclaratoria,
      date: new Date(Date.now()).valueOf()
    }
    this.historiaClinicaService.registrarNotasAclaratoria('notas-enfermeria',event.idNota, notaAclaratoria)
      .subscribe({
        'next': result => {
          if (result) Swal.fire({
            title: 'Advertencia!',
            text: 'Nota Aclaratoria registrada exitosamente',
            icon: 'success',
            confirmButtonText: 'Aceptar',
            ...this.defaultOptionsAlerts.success
          }).then(() => {
            this.formularioNotaEnfermeria.reset();
            this.formularioNotaEnfermeria.markAsUntouched();
            this.getNotasEnfermeria();
          })
        }, 'error': error => Swal.fire({
          title: 'Advertencia!',
          text: error.error.message,
          icon: 'warning',
          confirmButtonText: 'Aceptar',
          ...this.defaultOptionsAlerts.danger
        }).then(() => {
          this.formularioNotaEnfermeria.reset();
          this.formularioNotaEnfermeria.markAsUntouched();
        })
      })
  }
}
