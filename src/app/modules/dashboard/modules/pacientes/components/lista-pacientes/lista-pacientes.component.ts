import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource, MatTableDataSourcePaginator } from '@angular/material/table';
import { Router } from '@angular/router';
import { Paciente, PacientesService } from 'src/app/modules/shared/services/pacientes.service';

@Component({
  selector: 'app-lista-pacientes',
  templateUrl: './lista-pacientes.component.html',
  styleUrls: ['./lista-pacientes.component.scss']
})
export class ListaPacientesComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['nombre', 'fechaNacimiento', 'genero', 'tipoDocumento', 'documento', 'id'];

  dataSource!: MatTableDataSource<Paciente, MatTableDataSourcePaginator>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private readonly router: Router, private readonly pacienteService: PacientesService) {

  }
  ngOnInit(): void {
    this.getPaciente();
  }

  getPaciente() {
    this.pacienteService.getPacientes().subscribe(pacientes => {
      this.dataSource = new MatTableDataSource<Paciente>(pacientes)
    })
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  iniciarAtencion(id: string) {
    console.log('id: ', id);
    this.router.navigate(['/dashboard/pacientes/historia-clinica/' + id + '/resumen'])
  }
  editarPerfilPaciente(i: string) {
    console.log('id: ', i);

  }
  verHistorailClinico(i: string) {
    console.log('id: ', i);

  }
}



