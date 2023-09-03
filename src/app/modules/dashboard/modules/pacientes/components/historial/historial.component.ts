import { Component } from '@angular/core';
import {MatTableDataSource, MatTableDataSourcePaginator} from "@angular/material/table";
import {ActivatedRoute, Router} from "@angular/router";
import {HistoriaClinicaService} from "../../../../../shared/services/historia-clinica.service";
import Swal from "sweetalert2";
import {OPTIONS_SWEET_ALERT} from "../../../../../shared/utils/utils";

@Component({
  selector: 'app-historial',
  templateUrl: './historial.component.html',
  styleUrls: ['./historial.component.scss']
})
export class HistorialComponent {
  displayedColumns: string[] = ['fechaCreacion','historyId', 'tipoConsulta','state','actions'];
  defaultOptionsAlerts = OPTIONS_SWEET_ALERT;
  dataSource!: MatTableDataSource<any, MatTableDataSourcePaginator>;
    patientId: string = '';
  constructor(private readonly route: ActivatedRoute, private readonly historiaClinicaService: HistoriaClinicaService, private readonly router: Router) {
  }

  ngOnInit(){
    this.route.params.subscribe(params => {
      this.patientId = params['id']? params['id']:null;
        console.log(this.patientId)
      if(this.patientId) this.getHistoriasClinicas(this.patientId);
    })
  }

  getHistoriasClinicas(patientId:string){
    this.historiaClinicaService.getHistoriasPorPatientId(patientId)
        .subscribe(result => {
          if(result){
            console.log(result)
            this.dataSource = new MatTableDataSource<any>(result)
          }

        })
  }

  stringToNumber(historyId: string) {
    return Number(historyId);
  }

  cerrarHistoria(historyId: any) {
    console.log({historyId})
    Swal.fire({
      title: 'Cerrar historia clinica',
      text: 'Esta accion cerrara permanentemente la historia clinica',
      icon: 'warning',
      showCancelButton: true,
      showConfirmButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Aceptar',
      cancelButtonColor: 'red',
      ...this.defaultOptionsAlerts.success
    }).then(result => {
      if(result.isConfirmed){
        this.historiaClinicaService.cerrarHistoriaClinica(historyId).subscribe(res => {
          if(res) Swal.fire({
            title: 'Exito!',
            text: 'Historia clinica cerrada satisfactoriamente.',
            icon: 'success',
            showConfirmButton: true,
            confirmButtonText: 'Aceptar',
            ...this.defaultOptionsAlerts.success
          }).then(()=>{
            this.getHistoriasClinicas(this.patientId);
          })
        })
      }
    })
  }

  editarHistoriaActiva(patientId: string, historyId: any) {
    this.router.navigate(['/dashboard/pacientes/historia-clinica/' + patientId +'/'+ historyId + '/resumen'])
  }

  tipoAtencionToString(tipoConsulta: string) {
    let consulta = ''
    switch (Number(tipoConsulta)){
      case 1:
        consulta = 'Presencial';
        break;
      case 2:
        consulta = 'Telemedicina';
        break;
      case 3:
        consulta = 'Asistida';
        break;
    }
    return consulta;
  }
}
