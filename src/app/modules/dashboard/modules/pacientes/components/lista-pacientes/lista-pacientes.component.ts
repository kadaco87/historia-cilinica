import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-lista-pacientes',
  templateUrl: './lista-pacientes.component.html',
  styleUrls: ['./lista-pacientes.component.scss']
})
export class ListaPacientesComponent implements AfterViewInit {
  displayedColumns: string[] = ['nombre', 'fechaNacimiento', 'genero', 'tipoDocumento', 'documento', 'id'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  seledioclick(i: string) {
    console.log('id: ', i);

  }
}

export interface PeriodicElement {
  id: number;
  nombre: string,
  fechaNacimiento: Date,
  genero: string,
  tipoDocumento: string,
  documento: string,
}
const ELEMENT_DATA: PeriodicElement[] = [
  {
    id: 1, nombre: 'este fulanito tiene nombre de afganistan', fechaNacimiento: new Date, genero: 'string', tipoDocumento: 'string', documento: 'string',
  },
  {
    id: 2, nombre: 'string', fechaNacimiento: new Date, genero: 'string', tipoDocumento: 'string', documento: 'string',
  },
  {
    id: 3, nombre: 'string', fechaNacimiento: new Date, genero: 'string', tipoDocumento: 'string', documento: 'string',
  },
  {
    id: 4, nombre: 'string', fechaNacimiento: new Date, genero: 'string', tipoDocumento: 'string', documento: 'string',
  },
  {
    id: 5, nombre: 'string', fechaNacimiento: new Date, genero: 'string', tipoDocumento: 'string', documento: 'string',
  },
  {
    id: 6, nombre: 'string', fechaNacimiento: new Date, genero: 'string', tipoDocumento: 'string', documento: 'string',
  },
  {
    id: 7, nombre: 'string', fechaNacimiento: new Date, genero: 'string', tipoDocumento: 'string', documento: 'string',
  },

];

