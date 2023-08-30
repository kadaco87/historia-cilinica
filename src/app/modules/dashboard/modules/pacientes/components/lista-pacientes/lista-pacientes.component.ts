import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource, MatTableDataSourcePaginator} from '@angular/material/table';
import {Router} from '@angular/router';
import {UserInterface} from "../../../../../shared/models/user.interface";
import {UsersService} from "../../../../../shared/services/users.service";
import {UtilsService} from "../../../../../shared/services/utils.service";
import {GenderInterface} from "../../../../../shared/models/gender.interface";
import {DocumentTypeInterface} from "../../../../../shared/models/document-type.interface";
import {HistoriaClinicaService} from "../../../../../shared/services/historia-clinica.service";

@Component({
  selector: 'app-lista-pacientes',
  templateUrl: './lista-pacientes.component.html',
  styleUrls: ['./lista-pacientes.component.scss']
})
export class ListaPacientesComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['nombre', 'birthday', 'gender', 'documentType', 'identification', 'id'];
  genderList: GenderInterface[] = [];
  documentTypeList: DocumentTypeInterface[] = [];
  dataSource!: MatTableDataSource<UserInterface, MatTableDataSourcePaginator>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private readonly router: Router,
    private readonly usersService: UsersService,
    private readonly historyClinicaService: HistoriaClinicaService,
    private readonly utilsService: UtilsService
  ) {

  }

  ngOnInit(): void {
    this.getPaciente();
    this.getGenderList();
    this.getDocumentTypeList();
  }

  getPaciente() {
    this.usersService.getUsers('87f0a3bb-5f5c-48d0-a5f8-c7eca83098c3').subscribe(pacientes => {
      this.dataSource = new MatTableDataSource<UserInterface>(pacientes)
    })
  }

  getGenderList() {
    this.utilsService.getGenders().subscribe(genderList => this.genderList = genderList);
  }

  getDocumentTypeList() {
    this.utilsService.getDocumentTypeList().subscribe(documentTypeList => this.documentTypeList = documentTypeList);
  }

  findGender(id: string) {
    return this.genderList.find(gender => gender.id === id)
  }
  findDocumentType(id: string) {
    return this.documentTypeList.find(docType => docType.id === id)
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  iniciarAtencion(id: string) {
    const historyId = new Date(Date.now()).valueOf().toString()
    this.historyClinicaService.crearHistoriaClinica(historyId, id).subscribe({
      'next': result => {
        if(result) this.router.navigate(['/dashboard/pacientes/historia-clinica/' + id +'/'+ historyId + '/resumen'])
      }
    })

  }

  editarHistoriaActiva(patientId: string, historyId: string) {
    this.router.navigate(['/dashboard/pacientes/historia-clinica/' + patientId +'/'+ historyId + '/resumen'])
  }

  verHistorailClinico(i: string) {

  }
}



