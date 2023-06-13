import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Paciente, PacientesService } from 'src/app/modules/shared/services/pacientes.service';
import { DatePipe, formatDate } from '@angular/common';
import { getAgePure } from 'pure-age-calculator';

@Component({
  selector: 'app-datos-personales-paciente',
  templateUrl: './datos-personales-paciente.component.html',
  styleUrls: ['./datos-personales-paciente.component.scss']
})
export class DatosPersonalesPacienteComponent implements OnInit {
  paciente!: Paciente;
  edad: any = {
    years: 0,
    months: 0,
    days: 0
  };
  pipe = new DatePipe('en-CO');
  constructor(
    private readonly route: ActivatedRoute,
    private readonly pacienteService: PacientesService
  ) { }
  ngOnInit(): void {
    this.route.params.subscribe(param => {
      this.getPaciente(Number(param['id']))
    })

  }

  getPaciente(id: number) {

    this.pacienteService.getPaciente(id).subscribe(paciente => {
      if (paciente) {
        this.paciente = paciente;
        this.edad = this.getAge(paciente.fechaNacimiento);
      }
    })

  }

  getAge(fechaNacimiento: Date) {
    let edad = getAgePure(new Date(fechaNacimiento.valueOf()), new Date('2023-06-12'));
    edad['months'] = edad.months - (edad.years * 12);
    edad['days'] = edad.days - parseInt((edad.years * 365.25).toString());
    return edad;
  }

}
