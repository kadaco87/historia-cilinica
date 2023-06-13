import { Injectable } from '@angular/core';
import { of } from 'rxjs';

export interface Paciente {
  id: number;
  nombre: string,
  fechaNacimiento: Date,
  genero: string,
  tipoDocumento: string,
  numeroDocumento: string,
  activo: boolean;
  fotoPerfil: string,
  historiasClinicas: HistoriaClinica[]
}

export interface HistoriaClinica {
  id: number;
}

@Injectable({
  providedIn: 'root'
})
export class PacientesService {
  pacientes: Paciente[] = []

  constructor() {
    this.pacientes = [
      {
        id: 1, nombre: 'pedrito perez', fechaNacimiento: new Date(1986, 4, 17), genero: 'masculino', tipoDocumento: 'CC', numeroDocumento: '1130586460', activo: true, fotoPerfil: 'https://flxt.tmsimg.com/assets/p24724652_b_v13_ac.jpg', historiasClinicas: []
      },
      {
        id: 2, nombre: 'string', fechaNacimiento: new Date(Date.now()), genero: 'string', tipoDocumento: 'string', numeroDocumento: 'string', activo: true, fotoPerfil: 'https://i1.sndcdn.com/avatars-000252187355-42nbzf-t240x240.jpg', historiasClinicas: []
      },
      {
        id: 3, nombre: 'string', fechaNacimiento: new Date(Date.now()), genero: 'string', tipoDocumento: 'string', numeroDocumento: 'string', activo: true, fotoPerfil: 'https://i1.sndcdn.com/avatars-000252187355-42nbzf-t240x240.jpg', historiasClinicas: []
      },
      {
        id: 4, nombre: 'string', fechaNacimiento: new Date(Date.now()), genero: 'string', tipoDocumento: 'string', numeroDocumento: 'string', activo: true, fotoPerfil: 'https://i1.sndcdn.com/avatars-000252187355-42nbzf-t240x240.jpg', historiasClinicas: []
      },
      {
        id: 5, nombre: 'string', fechaNacimiento: new Date(Date.now()), genero: 'string', tipoDocumento: 'string', numeroDocumento: 'string', activo: true, fotoPerfil: 'https://i1.sndcdn.com/avatars-000252187355-42nbzf-t240x240.jpg', historiasClinicas: []
      },
      {
        id: 6, nombre: 'string', fechaNacimiento: new Date(Date.now()), genero: 'string', tipoDocumento: 'string', numeroDocumento: 'string', activo: true, fotoPerfil: 'https://i1.sndcdn.com/avatars-000252187355-42nbzf-t240x240.jpg', historiasClinicas: []
      },
      {
        id: 7, nombre: 'string', fechaNacimiento: new Date(Date.now()), genero: 'string', tipoDocumento: 'string', numeroDocumento: 'string', activo: true, fotoPerfil: 'https://i1.sndcdn.com/avatars-000252187355-42nbzf-t240x240.jpg', historiasClinicas: []
      },

    ];
  }
  getPacientes() {
    return of(this.pacientes)
  }
  getPaciente(id: number) {
    return of(this.pacientes.filter(paciente => paciente.id === id)[0]);
  }
}
