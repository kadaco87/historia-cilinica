import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {UsersService} from "../../../../../shared/services/users.service";
import {MatTableDataSource, MatTableDataSourcePaginator} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {UserInterface} from "../../../../../shared/models/user.interface";
import {Router} from "@angular/router";
import {UtilsService} from "../../../../../shared/services/utils.service";
import {RoleInterface} from "../../../../../shared/models/role.Interface";
import {DocumentTypeInterface} from "../../../../../shared/models/document-type.interface";

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['nombre', 'roleName', 'documentType', 'identification', 'id'];

  dataSource!: MatTableDataSource<UserInterface, MatTableDataSourcePaginator>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  roles: RoleInterface[] = [];
  documentTypeList: DocumentTypeInterface[] = [];

  constructor(
    private readonly usersService: UsersService,
    private readonly utilsService: UtilsService,
    private readonly router: Router
  ) {
  }

  ngOnInit(): void {
    this.getUsers();
    this.getRoles();
    this.getDocumetTypeList();
  }

  getUsers() {
    this.usersService.getUsers().subscribe(users => {
      if (users) {
        this.dataSource = new MatTableDataSource<UserInterface>(users)
      }
    });
  }

  getRoles(){
    this.utilsService.getRoles().subscribe({
      'next': roles => this.roles = roles,
      'error': error => console.error(error)
    })
  }

  getDocumetTypeList(){
    this.utilsService.getDocumentTypeList().subscribe({
      'next': documentTypeList => this.documentTypeList = documentTypeList,
      'error': error => console.error(error)
    })
  }

  getRoleName(roleId: string){
    return this.roles.find(role => role.id === roleId)?.role
  }
  getDocumentTypeName(documentTypeId: string){
    return this.documentTypeList.find(documentType => documentType.id === documentTypeId)?.documentType
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  editUserProfile(id: string) {
    this.router.navigate(['/dashboard/users/user-form/update/' + id]).then()

  }

}
