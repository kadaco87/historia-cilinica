import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {AntecedentesClinicosInterface} from "../../../../../shared/models/antecedentes-clinicos.interface";
import {HistoriaClinicaService} from "../../../../../shared/services/historia-clinica.service";
import Swal from "sweetalert2";
import {OPTIONS_SWEET_ALERT} from "../../../../../shared/utils/utils";

@Component({
  selector: 'app-antecedentes-clinicos',
  templateUrl: './antecedentes-clinicos.component.html',
  styleUrls: ['./antecedentes-clinicos.component.scss']
})
export class AntecedentesClinicosComponent implements OnInit {
  antecedentesForm: FormGroup = new FormGroup({});
  defaultOptionsAlerts = OPTIONS_SWEET_ALERT;
  parentescoOptions = [
    {id: 1, parentesco: 'Hijo'},
    {id: 2, parentesco: 'Madre'},
    {id: 3, parentesco: 'Padre'},
    {id: 4, parentesco: 'Hermano'},
    {id: 5, parentesco: 'Sobrinos'},
    {id: 6, parentesco: 'Tios'},
    {id: 7, parentesco: 'Nieto'},
    {id: 8, parentesco: 'Abuelos'},
    {id: 9, parentesco: 'No aplica'},
  ]
  historyId: string = '';
  patientId: string = '';

  constructor(private readonly route: ActivatedRoute, private readonly fb: FormBuilder, private readonly historiaClinicaService: HistoriaClinicaService) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.patientId = params['id'] || null;
      this.historyId = params['historyId'] || null;
      this.buildForm();
    })
  }

  buildForm() {
    this.antecedentesForm = this.fb.group({
      toxicologico: new FormGroup({
        tipo: new FormGroup({
          tabaquismo: new FormControl(false, []),
          alcoholismo: new FormControl(false, []),
          otros: new FormControl(false, []),
        }),
        observaciones: new FormControl('', [Validators.required])
      }),
      patologico: new FormGroup({
        tipo: new FormGroup({
          hipertensionArterial: new FormControl(false, []),
          diabetesMellitus: new FormControl(false, []),
          hepatitisB: new FormControl(false, []),
          hepatitisC: new FormControl(false, []),
          vih: new FormControl(false, []),
          serologia: new FormControl(false, []),
          epoc: new FormControl(false, []),
          enfermedadCoronaria: new FormControl(false, []),
          dislipidemia: new FormControl(false, []),
          cancer: new FormControl(false, []),
        }),
        observaciones: new FormControl('', [Validators.required])
      }),
      quirurgicos: new FormGroup({
        tipo: new FormGroup({
          nefrectomia: new FormControl(false, []),
          cirugiaAbdominal: new FormControl(false, []),
          apendicectomia: new FormControl(false, []),
          herniorrafia: new FormControl(false, []),
          laparotomia: new FormControl(false, []),
          histeroctomia: new FormControl(false, []),
          osteosintesis: new FormControl(false, []),
        }),
        observaciones: new FormControl('', [Validators.required])
      }),
      alergicos: new FormGroup({
        tipo: new FormGroup({
          penicilinas: new FormControl(false, []),
          sulfas: new FormControl(false, []),
          dipirona: new FormControl(false, []),
          iecas: new FormControl(false, []),
        }),
        observaciones: new FormControl('', [Validators.required])
      }),
      familiares: new FormArray([])
    })
    this.nuevoAntecedenteFamiliar();
  }

  nuevoAntecedenteFamiliar() {
    const antecedenteFam = this.fb.group({
      parentesco: new FormControl('', [Validators.required]),
      fechaDiagnostico: new FormControl('', [Validators.required]),
      diagnostico: new FormControl('', [Validators.required])
    })
    this.familiares.push(antecedenteFam);
  }

  get toxicologico() {
    return this.antecedentesForm.get('toxicologico');
  }

  get patologico() {
    return this.antecedentesForm.get('patologico');
  }

  get quirurgicos() {
    return this.antecedentesForm.get('quirurgicos');
  }

  get alergicos() {
    return this.antecedentesForm.get('alergicos');
  }

  get familiares() {
    return this.antecedentesForm.get('familiares') as FormArray;
  }

  crearAntecedentes() {

    console.log('antecedentesForm errors => ', this.antecedentesForm.errors)
    console.log('antecedentesForm valid => ', this.antecedentesForm.valid)
    if (this.antecedentesForm.valid) {
      let antecedentes: AntecedentesClinicosInterface = {
        historyId: +this.historyId,
        patientId: this.patientId,
        ...this.antecedentesForm.getRawValue(),
        familiares: this.familiares?.getRawValue().map(fam => {
          const dateSplit = fam.fechaDiagnostico.toString().split('-')
          return {
            ...fam,
            fechaDiagnostico: new Date(+dateSplit[0], +dateSplit[1] - 1, +dateSplit[2] ).valueOf()
          }
        })
      }

      console.log('antecedentes => ', antecedentes)
      this.historiaClinicaService.crearAntecedentes(antecedentes)
        .subscribe({
          'next': result => {
            if (result) Swal.fire({
              title: 'Exito!',
              text: 'Antecedentes clinicos registrados exitosamente',
              icon: 'success',
              confirmButtonText: 'Aceptar',
              ...this.defaultOptionsAlerts.success
            }).then(() => {
              this.antecedentesForm.reset();
              this.antecedentesForm.markAsUntouched();
            })
          }, 'error': error => Swal.fire({
            title: 'Error!',
            text: error.error.message,
            icon: 'warning',
            confirmButtonText: 'Aceptar',
            ...this.defaultOptionsAlerts.danger
          }).then(() => {
            this.antecedentesForm.reset();
            this.antecedentesForm.markAsUntouched();
          })
        })
    } else {
      this.antecedentesForm.markAllAsTouched();
    }

  }

}
