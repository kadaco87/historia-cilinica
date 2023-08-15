import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {HistoriaClinicaService} from "../../../../../shared/services/historia-clinica.service";
import {ActivatedRoute} from "@angular/router";
import Swal, { SweetAlertOptions } from "sweetalert2";
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
      tipoAtencion: new FormControl(null, []),
      planManejo: new FormControl(null, []),
      medicamentos: this.fb.array([])
    })
  }

  get medicamentos(){

    return this.ordenesMedicasForm.get('medicamentos')  as FormArray;
  }

  agregarOtroMedicamento(){
    const nuevoMedicamento = new FormGroup({
      categoriaMedicamento: new FormControl(null, []),
      medicamento: new FormControl(null, []),
      viaAdmon: new FormControl(null, []),
      dosis: new FormControl(null, []),
      presentacion: new FormControl(null, []),
      frecuencia: new FormControl(null, []),
      horario: new FormControl(null, []),
      duracion: new FormControl(null, []),
      tiempo: new FormControl(null, []),
    })
    this.medicamentos.push(nuevoMedicamento);
  }

  crearOrdenMedica() {
    if(this.ordenesMedicasForm.valid){
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
    }
  }

  private obtenerOrdenesMedicas() {
    this.ordenesMedicasList = []
  }
}
