import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {UsersService} from "../../../../../shared/services/users.service";
import {MatTableDataSource, MatTableDataSourcePaginator} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {User} from "../../../../../shared/models/user";
import {Router} from "@angular/router";

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['nombre', 'roleName', 'documentType', 'identification', 'id'];

  dataSource!: MatTableDataSource<User, MatTableDataSourcePaginator>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private readonly usersService: UsersService,
    private readonly router: Router
  ) {
  }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers() {
    this.usersService.getUsers().subscribe(users => {
      if (users) {
        this.dataSource = new MatTableDataSource<User>(users)
      }
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  editUserProfile(id: string) {
    console.log('id: ', id);
    this.router.navigate(['/dashboard/users/user-form/update/' + id]).then()

  }

}
