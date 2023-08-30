import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {HistoriaClinicaService} from "../../../../../shared/services/historia-clinica.service";
import {UtilsService} from "../../../../../shared/services/utils.service";
import {MedicamentoInteface} from "../../../../../shared/models/orden-medica.interface";
import {MatTableDataSource, MatTableDataSourcePaginator} from "@angular/material/table";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-medicamentos',
  templateUrl: './medicamentos.component.html',
  styleUrls: ['./medicamentos.component.scss']
})
export class MedicamentosComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = ['medicamento', 'presentacion', 'dosis', 'frecuencia', 'duracion', 'id'];
  dataSource!: MatTableDataSource<MedicamentoInteface, MatTableDataSourcePaginator>;
  historyId: string = '';
  medicamentosEnOrden: MedicamentoInteface[] = [];
  listadoMedicamentos: {
    id: string;
    principioactivo: string;
    concentracion: string;
    formafarmaceutica: string;
  }[] = [];
  subs: Subscription[] = [];

  constructor(
    private readonly route: ActivatedRoute,
    private readonly historiaClinicaService: HistoriaClinicaService,
    private readonly utilsService: UtilsService
  ) {
  }

  ngOnInit(): void {
    this.subs.push(
      this.route.params.subscribe(params => {
        this.historyId = params['historyId'];
        this.getMedicamentos();
        this.getOrdenesMedicas();
      })
    )
  }


  getOrdenesMedicas() {
    this.historiaClinicaService.getOrdenesMedicasPorHistoryId(this.historyId)
      .subscribe({
        'next': ordenes => {
          if (ordenes && ordenes.length > 0) {
            this.medicamentosEnOrden = [];
            ordenes.forEach(orden => {
              orden.medicamentos.forEach(med => this.medicamentosEnOrden.push(med));
            })
            console.log(this.medicamentosEnOrden)
            this.dataSource = new MatTableDataSource<MedicamentoInteface>(this.medicamentosEnOrden)
          }
        },
        'error': error => console.log(error)
      })
  }

  getMedicamentos() {
    this.utilsService.getMedicamentos().subscribe({
      'next': listaMedicamentos => this.listadoMedicamentos = listaMedicamentos
    })
  }

  getNombreMedicamentoPorId(idMed: string) {
    return this.listadoMedicamentos.find(med => med.id === idMed)?.principioactivo
  }

  ngOnDestroy(): void {
    this.subs.forEach(sub => {
      sub.unsubscribe()
      sub.remove(sub)
    })
  }


}
