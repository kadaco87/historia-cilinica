import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {RhInterface} from "../../../../../shared/models/rh.interface";
import {UtilsService} from "../../../../../shared/services/utils.service";
import {HistoriaClinicaService} from "../../../../../shared/services/historia-clinica.service";
import {ActivatedRoute} from "@angular/router";
import {OPTIONS_SWEET_ALERT} from "../../../../../shared/utils/utils";
import Swal from "sweetalert2";
import {CrearSignosVitales, SignosVitalesInterface} from "../../../../../shared/models/signos-vitales.interface";
import {MatTableDataSource, MatTableDataSourcePaginator} from "@angular/material/table";

@Component({
  selector: 'app-signos-vitales',
  templateUrl: './signos-vitales.component.html',
  styleUrls: ['./signos-vitales.component.scss']
})
export class SignosVitalesComponent implements OnInit {
  // las variables se declaran encima del constructor
  patientId: string = '';
  formularioSignosVitales!: FormGroup;
  dataSource!: MatTableDataSource<SignosVitalesInterface, MatTableDataSourcePaginator>;
  displayedColumns: string[] = [
    'date',
    'fc',
    'fr',
    'so2',
    'pa',
    'pam',
    'temp',
    'glasgow',
    'est',
    'peso',
    'imc',
    'rh'
  ];
  defaultOptionsAlerts = OPTIONS_SWEET_ALERT;
  rhList: RhInterface[] = [];
  listaSignosVitales: SignosVitalesInterface[] = [];
  historyId = '';

  constructor(
    private readonly route: ActivatedRoute,
    private readonly fb: FormBuilder,
    private readonly utilsService: UtilsService,
    private readonly historiaClinicaService: HistoriaClinicaService
  ) {

  }

  /* hace parte del ciclo de vida y se dispara despues que se ejecuta el constructor
  para inicializar variables del componente
  */
  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.patientId = params['id'] ? params['id'] : null;
      this.historyId = params['historyId'] ? params['historyId'] : null;
      this.getListaRH();
      this.initForm();
      this.getSignosVitales();
    })

  }

  initForm() {
    this.formularioSignosVitales = this.fb.group({
      // setiar valores iniciales o sino se deja en null
      frecuenciaCardiaca: new FormControl<number | null>(null, [Validators.required]),
      frecuenciaRespiratoria: new FormControl<number | null>(null, [Validators.required]),
      saturacion: new FormControl<number | null>(null, [Validators.required]),
      sistolica: new FormControl<number | null>(null, [Validators.required]),
      diastolica: new FormControl<number | null>(null, [Validators.required]),
      pam: new FormControl<number | null>(0),
      temperatura: new FormControl<number | null>(null, [Validators.required]),
      glasgow: new FormControl<number | null>(null, [Validators.required]),
      estatura: new FormControl<number | null>(null, [Validators.required]),
      peso: new FormControl<number | null>(null, [Validators.required]),
      imc: new FormControl<number | null>(null),
      rh: new FormControl([], [Validators.required]),
    });
  }

  getSignosVitales() {
    this.historiaClinicaService.obtenerSignosVitales(this.historyId)
      .subscribe({
        'next': result => {
          this.dataSource = new MatTableDataSource<SignosVitalesInterface>(result.reverse());
        },
        'error': error => console.error(error),
      })
  }

  getListaRH() {
    this.utilsService.getRH().subscribe(listaRH => this.rhList = listaRH);
  }

  getRHPorId(rhId: string) {
    return this.rhList.find(rh => rh.id === rhId);
  }
  enviarFormulario() {
    if (!this.formularioSignosVitales.valid) {
      this.formularioSignosVitales.markAllAsTouched();
    } else {
      const dataSignosVitales: CrearSignosVitales = {
        date: new Date(Date.now()).valueOf(),
        diastolica: Number(this.diastolica?.value),
        estatura: Number(this.estatura?.value),
        frecuenciaCardiaca: Number(this.frecuenciaCardiaca?.value),
        frecuenciaRespiratoria: Number(this.frecuenciaRespiratoria?.value),
        glasgow: Number(this.glasgow?.value),
        imc: Number(this.imc?.value),
        pam: Number(this.pam?.value),
        peso: Number(this.peso?.value),
        rh: this.rh?.value,
        saturacion: Number(this.saturacion?.value),
        sistolica: Number(this.sistolica?.value),
        temperatura: Number(this.temperatura?.value)
      };
      this.historiaClinicaService.registrarSignosVitales( this.historyId,this.patientId, dataSignosVitales)
        .subscribe({
          'next': result => {
            if (result) Swal.fire({
              title: 'Advertencia!',
              text: 'Signos vitales registrados exitosamente',
              icon: 'success',
              confirmButtonText: 'Aceptar',
              ...this.defaultOptionsAlerts.success
            }).then(() => {
              this.formularioSignosVitales.reset();
              this.formularioSignosVitales.markAsUntouched();
              this.getSignosVitales();
            })
          }, 'error': error => Swal.fire({
            title: 'Advertencia!',
            text: error.error.message,
            icon: 'warning',
            confirmButtonText: 'Aceptar',
            ...this.defaultOptionsAlerts.danger
          }).then(() => {
            this.formularioSignosVitales.reset();
            this.formularioSignosVitales.markAsUntouched();
          })
        })
    }
  }

  calcularPam() {
    if (this.diastolica?.dirty && this.sistolica?.dirty) {
      const diastolica = Number(this.diastolica?.value || 1);
      const sistolica = Number(this.sistolica?.value || 1);
      const pam = parseInt(String((sistolica + (2 * diastolica)) / 3));
      this.pam?.setValue(pam);
    }
  }

  calcularImc() {
    if (this.peso?.dirty && this.estatura?.dirty) {
      const peso = Number(this.peso?.value || 1);
      const estatura = Number(this.estatura?.value || 1) / 100;
      const imc = parseInt(String((peso / (2 * estatura))))
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


}
