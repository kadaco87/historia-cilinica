import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {DatePipe} from '@angular/common';
import {getAgePure} from 'pure-age-calculator';
import {UsersService} from "../../../../../shared/services/users.service";
import {UserInterface} from "../../../../../shared/models/user.interface";
import {DocumentTypeInterface} from "../../../../../shared/models/document-type.interface";
import {UtilsService} from "../../../../../shared/services/utils.service";

@Component({
  selector: 'app-datos-personales-paciente',
  templateUrl: './datos-personales-paciente.component.html',
  styleUrls: ['./datos-personales-paciente.component.scss']
})
export class DatosPersonalesPacienteComponent implements OnInit {
  paciente!: UserInterface;
  documentTypeList: DocumentTypeInterface[] = [];
  edad: any = {
    years: 0,
    months: 0,
    days: 0
  };
  pipe = new DatePipe('en-CO');

  constructor(
    private readonly route: ActivatedRoute,
    private readonly usersService: UsersService,
    private readonly utilsService: UtilsService,
  ) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(param => {
      this.getPaciente(param['id']);
    })
this.getDocumentTypes();
  }

  getPaciente(id: string) {

    this.usersService.getOneUser(id)
      .subscribe(paciente => {
      if (paciente) {
        paciente['fotoPerfil'] = paciente.gender === '4b0d6531-b2f5-43a2-a373-6258125a1e7b' ? 'https://media.istockphoto.com/id/499923566/sv/vektor/woman-interface-icon-vector.jpg?s=170667a&w=0&k=20&c=mZy4Ct02tq1J2y9vmPg0mgwEs6uuFWDShzfMy3cF83k=':(paciente.gender==='18133553-4fd9-4b2b-9a24-d294b3e820ae'?'https://www.shareicon.net/data/256x256/2016/09/15/829459_man_512x512.png':'https://www.nicepng.com/png/detail/128-1280406_view-user-icon-png-user-circle-icon-png.png');
        this.paciente = paciente;
        this.edad = this.getAge(paciente.birthday);
      }
    })

  }

  getDocumentTypes() {
    this.utilsService.getDocumentTypes().subscribe({
      'next': (val) => {
        this.documentTypeList = val
        console.log(this.documentTypeList);
      },
      'error': error => console.error(error),
    })
  }

  findDocumentType(id: string) {
    return this.documentTypeList.find(docType => docType.id === id);
  }
  getAge(birthday: number) {
    const date = new Date().setTime(birthday);
    let edad = getAgePure(new Date(date), new Date(Date.now()));
    edad['months'] = edad.months - (edad.years * 12);
    edad['days'] = edad.days - parseInt((edad.years * 365.25).toString());
    return edad;
  }

}
