import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {UsersService} from "../../services/users.service";
import {UtilsService} from "../../services/utils.service";
import {DocumentTypeItem} from "../../models/document-type-item";
import {Country} from "../../models/country";
import {Gender} from "../../models/gender";
import {Role} from "../../models/role";
import {ActivatedRoute} from "@angular/router";


@Component({
  selector: 'app-person-form',
  templateUrl: './person-form.component.html',
  styleUrls: ['./person-form.component.scss']
})
export class PersonFormComponent implements OnInit {
  personAndUserForm: FormGroup = new FormGroup({});
  code!: any;

  documentTypes: DocumentTypeItem[] = [];
  countries: Country[] = [];
  genderList: Gender[] = [];
  roles: Role[] = [];
  view: string = '';

  constructor(
    private readonly fb: FormBuilder,
    private readonly usersService: UsersService,
    private readonly utilsService: UtilsService,
    private readonly route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
     this.route.url.subscribe(url => this.view = url[0].path);
    this.getCountries();
    this.getGenderList();
    this.getDocumentTypes();
    this.getRoles();
    this.intForm();
  }

  intForm() {
    this.personAndUserForm = this.fb.group({
      fullName: this.fb.group({
        firstName: new FormControl('', [Validators.required]),
        secondName: new FormControl('',),
        firstLastName: new FormControl('', [Validators.required]),
        secondLastName: new FormControl('',),
      }),
      documentType: new FormControl('', [Validators.required]),
      identification: new FormControl('', [Validators.required]),
      birthday: new FormControl('', [Validators.required]),
      gender: new FormControl('', [Validators.required]),
      contactInfo: this.fb.group({
        countryOfResidence: new FormControl('', [Validators.required]),
        zipCode: new FormControl('', [Validators.required]),
        phone: new FormControl('', [Validators.required]),
        address: new FormControl('', [Validators.required]),
        state: new FormControl('', [Validators.required]),
        city: new FormControl('', [Validators.required]),
        email: new FormControl('', [Validators.required]),
      }),
    })
    if(this.view === 'user-form') this.personAndUserForm.addControl('role', new FormControl('', [Validators.required]))
  }

  get role() {
    return this.personAndUserForm.get('role');
  }
  get countryOfResidence() {
    return this.personAndUserForm.get('countryOfResidence');
  }

  getCountries() {
    this.utilsService.getCountries()
      .subscribe({
        'next': (val) => {
          this.countries = val.sort(this.sortCountries)
        },
        'error': error => console.error(error),
      })
  }

  sortCountries(a:any, b:any) {
    if (a.countryName > b.countryName) {
      return 1;
    }
    if (a.countryName < b.countryName) {
      return -1;
    }
    // a must be equal to b
    return 0;
  }

  getGenderList(){
    this.utilsService.getGender().subscribe({
      'next': (val) => {
        this.genderList = val
      },
      'error': error => console.error(error),
    })
  }

  getDocumentTypes(){
    this.utilsService.getDocumentTypes().subscribe({
      'next': (val) => {
        this.documentTypes = val
      },
      'error': error => console.error(error),
    })
  }

  getRoles(){
    this.utilsService.getRoles().subscribe({
      'next': (roles) => {
        this.roles = roles
      },
      'error': error => console.error(error),
    })
  }

  createUserOrPatient() {
    if(this.view === 'user-form'){
      if (this.role?.valid) {
        this.usersService.createUserOrPatient(this.personAndUserForm.getRawValue())
          .subscribe(response => console.log)
      }else{
        this.personAndUserForm.markAllAsTouched();
      }
    }else{
      console.log('llamar al servicio de pacientes para crear paciente')
    }

  }

  setCode(event: any) {
    this.code = (event.target as HTMLSelectElement).value.split(':')[1];
  }

}
