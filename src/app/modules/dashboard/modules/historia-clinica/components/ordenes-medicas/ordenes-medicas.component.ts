import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {HistoriaClinicaService} from "../../../../../shared/services/historia-clinica.service";
import {ActivatedRoute} from "@angular/router";
import Swal, {SweetAlertOptions} from "sweetalert2";
import {OrdenMedicaInterface} from "../../../../../shared/models/orden-medica.interface";
import {UtilsService} from "../../../../../shared/services/utils.service";

@Component({
  selector: 'app-ordenes-medicas',
  templateUrl: './ordenes-medicas.component.html',
  styleUrls: ['./ordenes-medicas.component.scss']
})
export class OrdenesMedicasComponent implements OnInit {
  ordenesMedicasForm: FormGroup = new FormGroup<any>({});
  id: string = '';
  ordenesMedicasList: any[] = [];
  listaMedicamentos: {
    id: string;
    principioactivo: string;
    concentracion: string;
    formafarmaceutica: string;
  }[] = [];
  defaultOptionsAlerts!: { success: SweetAlertOptions<any, any>; danger: SweetAlertOptions<any, any>; };

  constructor(
    private readonly route: ActivatedRoute,
    private readonly fb: FormBuilder,
    private readonly historiaClinicaService: HistoriaClinicaService,
    private readonly utilsService: UtilsService
  ) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params['id'] || null;
    });
    this.listarMedicamentos()
    this.initForm();
    this.obtenerOrdenesMedicas();
  }

  initForm() {
    this.ordenesMedicasForm = this.fb.group({
      tipoAtencion: new FormControl(null, [Validators.required]),
      planManejo: new FormControl(null, [Validators.required]),
      medicamentos: this.fb.array([])
    })
  }

  listarMedicamentos(){
    this.utilsService.getMedicamentos().subscribe({
      'next': result => this.listaMedicamentos = result,
      'error': error => console.log(error)
    })
  }

  get medicamentos() {
    return this.ordenesMedicasForm.get('medicamentos') as FormArray;
  }

  agregarOtroMedicamento() {
    const nuevoMedicamento = new FormGroup({
      categoriaMedicamento: new FormControl(null, [Validators.required]),
      medicamento: new FormControl( null, [Validators.required]),
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
      const medicamentos: any[] = [];
      this.medicamentos.controls.forEach(controls => {
        medicamentos.push({
          ...controls.value,
          medicamento: this.obtenerIdMedicamento(controls.get('medicamento')?.value)
        })
      });
      const ordenMedica: OrdenMedicaInterface = {
        ...this.ordenesMedicasForm.getRawValue(),
        date: new Date(Date.now()).valueOf(),
        medicamentos
      }
      this.historiaClinicaService.crearOrdenMedica(this.id, ordenMedica)
        .subscribe({
          'next': result => {
            if (result) Swal.fire({
              title: 'Advertencia!',
              text: 'Orden medica registrada exitosamente',
              icon: 'success',
              confirmButtonText: 'Aceptar',
              ...this.defaultOptionsAlerts
            }).then(() => {
              this.ordenesMedicasForm.reset();
              this.ordenesMedicasForm.markAsUntouched();
              this.obtenerOrdenesMedicas();
            })
          }, 'error': error => Swal.fire({
            title: 'Advertencia!',
            text: error.message,
            icon: 'warning',
            confirmButtonText: 'Aceptar',
            ...this.defaultOptionsAlerts
          }).then(() => {
            this.ordenesMedicasForm.reset();
            this.ordenesMedicasForm.markAsUntouched();
          })
        })
    } else {
      this.ordenesMedicasForm.markAllAsTouched();
    }
  }

  obtenerOrdenesMedicas() {
    this.ordenesMedicasList = []
    this.historiaClinicaService.getOrdenesMedicasPorPaciente(this.id)
      .subscribe(lista => {
        if(lista.length===0) {
          this.ordenesMedicasList = [];
        }else{
          this.ordenesMedicasList = lista;
          console.log(this.ordenesMedicasList)
        }
      })
  }

  opcionesFiltradas(position: number): any[] {
    console.log('this.medicamentos.controls[position].get(\'medicamento\')?.value.toLowerCase() => ', this.medicamentos.controls[position].get('medicamento')?.value.toLowerCase())
    return this.listaMedicamentos.filter(opcion =>
      opcion.principioactivo.toLowerCase().includes(this.medicamentos.controls[position].get('medicamento')?.value.toLowerCase())
    );
  }

  obtenerIdMedicamento(option: string){
    const principioactivo = option.split('|')[0].trimEnd();
    const concentracion = option.split('|')[1].trimStart();
    return this.listaMedicamentos.find(med => med.principioactivo === principioactivo && med.concentracion === concentracion)?.id;
  }
}
