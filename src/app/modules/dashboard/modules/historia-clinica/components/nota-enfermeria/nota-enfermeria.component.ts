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
  patientId: string = '';
  historyId: string = '';

  constructor(
    private readonly fb: FormBuilder,
    private readonly historiaClinicaService: HistoriaClinicaService,
    private readonly authService: AuthService,
    private readonly route: ActivatedRoute
  ) {

  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.patientId = params['id'] || null;
      this.historyId = params['historyId'] || null;
    })
    this.initForm();
  }

  initForm() {
    this.getNotasEnfermeria();
    this.formularioNotaEnfermeria = this.fb.group({
      temporalidad: new FormControl('1', [Validators.required]),
      nota: new FormControl('', [Validators.required]),
    })
  }

  getNotasEnfermeria() {
    this.historiaClinicaService.obtenerNotasEnfermeria(this.patientId)
      .subscribe({
        'next': notas => {
          if(notas) {
            this.listaNotas = notas
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
        temporalidad: Number(this.temporalidad?.value),
        date: new Date(Date.now()).valueOf(),
        notasAclaratorias: []
      }
      this.historiaClinicaService.registrarNotasEnfermeria(this.historyId, this.patientId, notaEnfermeria)
        .subscribe({
          'next': result => {
            if (result) Swal.fire({
              title: 'Exito!',
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
            title: 'Error!',
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
    const notaAclaratoria = {
      notaAclaratoria: event.notaAclaratoria,
      date: new Date(Date.now()).valueOf()
    }
    this.historiaClinicaService.registrarNotasAclaratoria('notas-enfermeria',event.idNota, notaAclaratoria)
      .subscribe({
        'next': result => {
          if (result) Swal.fire({
            title: 'Exito!',
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
          title: 'Error!',
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
