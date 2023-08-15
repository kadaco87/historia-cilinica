import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {HistoriaClinicaService} from "../../../../../shared/services/historia-clinica.service";
import {ActivatedRoute} from "@angular/router";
import Swal, {SweetAlertOptions} from "sweetalert2";
import {OrdenMedicaInterface} from "../../../../../shared/models/orden-medica.interface";

@Component({
  selector: 'app-ordenes-medicas',
  templateUrl: './ordenes-medicas.component.html',
  styleUrls: ['./ordenes-medicas.component.scss']
})
export class OrdenesMedicasComponent implements OnInit {
  ordenesMedicasForm: FormGroup = new FormGroup<any>({});
  private id: string = '';
  private ordenesMedicasList: any[] = [];
  private defaultOptionsAlerts!: { success: SweetAlertOptions<any, any>; danger: SweetAlertOptions<any, any>; };

  constructor(
    private readonly route: ActivatedRoute,
    private readonly fb: FormBuilder,
    private readonly historiaClinicaService: HistoriaClinicaService
  ) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params['id'] || null;
    })
    this.initForm();
  }

  initForm() {
    this.ordenesMedicasForm = this.fb.group({
      tipoAtencion: new FormControl(null, [Validators.required]),
      planManejo: new FormControl(null, [Validators.required]),
      medicamentos: this.fb.array([])
    })
  }

  get medicamentos() {
    return this.ordenesMedicasForm.get('medicamentos') as FormArray;
  }

  agregarOtroMedicamento() {
    const nuevoMedicamento = new FormGroup({
      categoriaMedicamento: new FormControl(null, [Validators.required]),
      medicamento: new FormControl(null, [Validators.required]),
      viaAdmon: new FormControl(null, [Validators.required]),
      dosis: new FormControl(null, [Validators.required]),
      presentacion: new FormControl(null, [Validators.required]),
      frecuencia: new FormControl(null, [Validators.required]),
      horario: new FormControl(null, [Validators.required]),
      duracion: new FormControl(null, [Validators.required]),
      tiempo: new FormControl(null, [Validators.required]),
    })
    this.medicamentos.push(nuevoMedicamento);
  }

  crearOrdenMedica() {
    if (this.ordenesMedicasForm.valid) {
      const ordenMedica: OrdenMedicaInterface = {
        ...this.ordenesMedicasForm.getRawValue(),
        date: new Date(Date.now()).valueOf()
      }
      console.log(ordenMedica)
      this.historiaClinicaService.crearOrdenMedica(this.id, ordenMedica)
        .subscribe({
          'next': result => {
            if (result) Swal.fire({
              title: 'Advertencia!',
              text: 'Nota Aclaratoria registrada exitosamente',
              icon: 'success',
              confirmButtonText: 'Aceptar',
              ...this.defaultOptionsAlerts.success
            }).then(() => {
              this.ordenesMedicasForm.reset();
              this.ordenesMedicasForm.markAsUntouched();
              this.obtenerOrdenesMedicas();
            })
          }, 'error': error => Swal.fire({
            title: 'Advertencia!',
            text: error.error.message,
            icon: 'warning',
            confirmButtonText: 'Aceptar',
            ...this.defaultOptionsAlerts.danger
          }).then(() => {
            this.ordenesMedicasForm.reset();
            this.ordenesMedicasForm.markAsUntouched();
          })
        })
    } else {
      this.ordenesMedicasForm.markAllAsTouched();
    }
  }

  private obtenerOrdenesMedicas() {
    this.ordenesMedicasList = []
  }
}
