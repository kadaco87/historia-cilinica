import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import Swal from "sweetalert2";
import {HistoriaClinicaService} from "../../../../../shared/services/historia-clinica.service";
import {OPTIONS_SWEET_ALERT} from "../../../../../shared/utils/utils";
import {UtilsService} from "../../../../../shared/services/utils.service";

@Component({
  selector: 'app-atencion-medica',
  templateUrl: './atencion-medica.component.html',
  styleUrls: ['./atencion-medica.component.scss']
})
export class AtencionMedicaComponent implements OnInit {

  formularioAtencionMedica: FormGroup = new FormGroup({});
  defaultOptionsAlerts = OPTIONS_SWEET_ALERT;
  listaAtencionesMedicas: any[] = [];
  listaTiposConsulta: any[] = [];
  listaDiagnosticos: { nombre: string, codigo: string }[] = [];

  constructor(private readonly fb: FormBuilder,
              private readonly historiaClinicaService: HistoriaClinicaService,
              private readonly utilsService: UtilsService
  ) {
  }

  ngOnInit(): void {
    this.obtenerListaDiagnosticos();
    this.formInit();
    this.cie10?.valueChanges.subscribe(value => console.log(value))
  }

  obtenerListaDiagnosticos() {
    if (this.listaDiagnosticos.length < 1) {
      this.utilsService.getDiagnosticos().subscribe({
        'next': listaDiagnosticos => {
          this.listaDiagnosticos = listaDiagnosticos
          console.log(this.listaDiagnosticos)
        },
        'error': error => console.log(error)
        }
      )
    }
  }

  crearAtencionMedica() {

    if (this.formularioAtencionMedica.valid) {
      this.historiaClinicaService.crearAtencionMedica(this.formularioAtencionMedica.getRawValue())
        .subscribe({
          'next': result => {
            if (result) Swal.fire({
              title: 'Advertencia!',
              text: 'Atencion medica registrada exitosamente',
              icon: 'success',
              confirmButtonText: 'Aceptar',
              ...this.defaultOptionsAlerts.success
            }).then(() => {
              this.formularioAtencionMedica.reset();
              this.formularioAtencionMedica.markAsUntouched();
              // this.getNotasEnfermeria();
            })
          }, 'error': error => Swal.fire({
            title: 'Advertencia!',
            text: error.error.message,
            icon: 'warning',
            confirmButtonText: 'Aceptar',
            ...this.defaultOptionsAlerts.danger
          }).then(() => {
            this.formularioAtencionMedica.reset();
            this.formularioAtencionMedica.markAsUntouched();
          })
        })
    } else {
      this.formularioAtencionMedica.markAllAsTouched()
    }

  }

  recibirDataFormularioModal(event: any) {
    console.log('event: ', event);
    const notaAclaratoria = {
      notaAclaratoria: event.notaAclaratoria,
      date: new Date(Date.now()).valueOf()
    }
    this.historiaClinicaService.registrarNotasAclaratoria('atenciones-medicas', event.idNota, notaAclaratoria)
      .subscribe({
        'next': result => {
          if (result) Swal.fire({
            title: 'Advertencia!',
            text: 'Nota aclaratoria de la atencion medica registrada exitosamente',
            icon: 'success',
            confirmButtonText: 'Aceptar',
            ...this.defaultOptionsAlerts.success
          }).then(() => {
            this.formularioAtencionMedica.reset();
            this.formularioAtencionMedica.markAsUntouched();
            // this.getNotasEnfermeria();
          })
        }, 'error': error => Swal.fire({
          title: 'Advertencia!',
          text: error.error.message,
          icon: 'warning',
          confirmButtonText: 'Aceptar',
          ...this.defaultOptionsAlerts.danger
        }).then(() => {
          this.formularioAtencionMedica.reset();
          this.formularioAtencionMedica.markAsUntouched();
        })
      })
  }

  nombreTipoConsulta(tipoConsultaId: string) {
    return this.listaTiposConsulta.find(tipoConsulta => tipoConsulta.id === tipoConsultaId)
  }

  formInit() {
    this.formularioAtencionMedica = this.fb.group({
      modalidad: new FormControl('', [Validators.required]),
      tipoConsulta: new FormControl('', [Validators.required]),
      nombreConsulta: new FormControl('', [Validators.required]),
      consecutivoConsulta: new FormControl(new Date(Date.now()).valueOf(), [Validators.required]),
      enfermedadActual: new FormControl('', [Validators.required]),
      articular: new FormControl('', [Validators.required]),
      cardiaco: new FormControl('', [Validators.required]),
      muscular: new FormControl('', [Validators.required]),
      linfatico: new FormControl('', [Validators.required]),
      digestivo: new FormControl('', [Validators.required]),
      reproductor: new FormControl('', [Validators.required]),
      endocrino: new FormControl('', [Validators.required]),
      urinario: new FormControl('', [Validators.required]),
      respiratorio: new FormControl('', [Validators.required]),
      nervioso: new FormControl('', [Validators.required]),
      inmunitario: new FormControl('', [Validators.required]),
      tegumentario: new FormControl('', [Validators.required]),
      examenFisico: new FormControl('', [Validators.required]),
      causaExterna: new FormControl('', [Validators.required]), // Causa Externa ?
      cie10: new FormControl('', [Validators.required]),
      fechaRegistro: new FormControl('', [Validators.required]),
      clasificacionDiagnostico: new FormControl('', [Validators.required]),
      tipoDiagnostico: new FormControl('', [Validators.required]),
    })
  }

  get cie10(){
    return this.formularioAtencionMedica.get('cie11');
  }
  get opcionesFiltradas(): any[] {
    return this.listaDiagnosticos.filter(opcion =>
      opcion.nombre.toLowerCase().includes(this.cie10?.value.toLowerCase())
    );
  }

}
