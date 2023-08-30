import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {UsersService} from "../../services/users.service";
import {UtilsService} from "../../services/utils.service";
import {DocumentTypeInterface} from "../../models/document-type.interface";
import {CountryInterface} from "../../models/country.interface";
import {GenderInterface} from "../../models/gender.interface";
import {RoleInterface} from "../../models/role.Interface";
import {ActivatedRoute, Router} from "@angular/router";
import {UserInterface} from "../../models/user.interface";
import {environment} from "../../../../../environments/environment";
import {OPTIONS_SWEET_ALERT} from "../../utils/utils";
import Swal from "sweetalert2";

@Component({
  selector: 'app-person-form',
  templateUrl: './person-form.component.html',
  styleUrls: ['./person-form.component.scss']
})
export class PersonFormComponent implements OnInit {
  personAndUserForm: FormGroup = new FormGroup({});
  defaultOptionsAlerts = OPTIONS_SWEET_ALERT;
  documentTypeList: DocumentTypeInterface[] = [];
  countries: CountryInterface[] = [];
  genderList: GenderInterface[] = [];
  roles: RoleInterface[] = [];
  view: string = '';
  actionView = '';
  id = '';
  user!: UserInterface;
  patientRole = environment.patientRole;


  constructor(
    private readonly fb: FormBuilder,
    private readonly usersService: UsersService,
    private readonly utilsService: UtilsService,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
  ) {
  }

  ngOnInit(): void {
    this.route.url.subscribe(url => this.view = url[0].path);
    this.route.params.subscribe(params => {
      this.id = params['id'] || null;
      this.actionView = params['action'] || null;
    })
    this.getCountries();
    this.getGenderList();
    this.getDocumentTypes();
    this.getRoles();
    this.intForm();
    this.getOneUserOrPatient();
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
      birthday: new FormControl(null, [Validators.required]),
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
    if (this.view === 'user-form') this.personAndUserForm.addControl('role', new FormControl('', [Validators.required]))
  }

  getOneUserOrPatient() {
    if (this.view === 'user-form' && this.actionView === 'update') {
      this.usersService.getOneUser(this.id).subscribe(user => {
        this.user = user;
        if (this.user) {
          this.fillForm();
        }
      })
    }
  }

  fillForm() {
    let fullName = Object.assign(this.user.fullName);
    let contactInfo = Object.assign(this.user.contactInfo);
    delete fullName['_id'];
    delete fullName['deleted'];
    delete contactInfo['_id'];
    delete contactInfo['deleted'];
    this.personAndUserForm.get('fullName')?.setValue(fullName);
    this.personAndUserForm.get('contactInfo')?.setValue(contactInfo);

    const date = new Date().setTime(this.user.birthday);

    this.birthday?.setValue(new Date(date).toISOString().substring(0, 10))

    this.gender?.setValue(this.findGender(this.user.gender));
    this.role?.setValue(this.findRole(this.user.role));
    this.documentType?.setValue(this.findDocumentType(this.user.documentType));
    this.identification?.setValue(this.user.identification);
  }

  findDocumentType(id: string) {
    return this.documentTypeList.find(docType => docType.id === id);
  }

  findRole(id: string) {
    return this.roles.find(role => role.id === id);
  }

  findGender(id: string) {
    return this.genderList.find(gender => gender.id === id);
  }

  get role() {
    return this.personAndUserForm.get('role');
  }

  get gender() {
    return this.personAndUserForm.get('gender');
  }

  get zipCode() {
    return this.personAndUserForm.get('contactInfo.zipCode');
  }

  get birthday() {
    return this.personAndUserForm.get('birthday');
  }

  get documentType() {
    return this.personAndUserForm.get('documentType');
  }

  get identification() {
    return this.personAndUserForm.get('identification');
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

  sortCountries(a: any, b: any) {
    if (a.countryName > b.countryName) {
      return 1;
    }
    if (a.countryName < b.countryName) {
      return -1;
    }
    // a must be equal to b
    return 0;
  }

  getGenderList() {
    this.utilsService.getGenders().subscribe({
      'next': (genders) => {
        if (genders) {
          this.genderList = genders
        }
      },
      'error': error => console.error(error),
    })
  }

  getDocumentTypes() {
    this.utilsService.getDocumentTypeList().subscribe({
      'next': (val) => {
        this.documentTypeList = val
      },
      'error': error => console.error(error),
    })
  }

  getRoles() {
    this.utilsService.getRoles().subscribe({
      'next': (roles) => {
        let rolesObj = Object.assign(roles);
        delete rolesObj['_id'];
        delete rolesObj['__v'];
        delete rolesObj['deleted'];
        this.roles = rolesObj
      },
      'error': error => console.error(error),
    })
  }

  createUserOrPatient() {
    if (this.view === 'user-form') {
      if (this.role?.valid && this.birthday?.valid) {
        const dateArray = this.birthday?.getRawValue()?.split('-');
        const user = {
          ...this.personAndUserForm.getRawValue(),
          birthday: new Date(Number(dateArray[0]), Number(dateArray[1]) - 1, Number(dateArray[2]), 0, 0, 0, 0).valueOf()
        }
        this.usersService.createUserOrPatient(user)
          .subscribe({
            'next': response => {
              if (response) {
                Swal.fire({
                  title: 'Advertencia!',
                  text: 'El usuario fue creado exitosamente',
                  icon: 'success',
                  confirmButtonText: 'Aceptar',
                  ...this.defaultOptionsAlerts.success
                }).then(() => this.router.navigate(['/', 'dashboard', 'pacientes']).then())

              } else {
                this.personAndUserForm.markAllAsTouched();
              }
            },
            'error': error => Swal.fire({
              title: 'Advertencia!',
              text: error.error.message,
              icon: 'warning',
              confirmButtonText: 'Aceptar',
              ...this.defaultOptionsAlerts.success
            }).then()
          })
      } else {
        this.personAndUserForm.markAllAsTouched();
      }
    } else {
      if (this.personAndUserForm.valid) {
        const dateArray = this.birthday?.getRawValue()?.split('-');
        const user = {
          ...this.personAndUserForm.getRawValue(),
          role: this.patientRole,
          birthday: new Date(Number(dateArray[0]), Number(dateArray[1]) - 1, Number(dateArray[2]), 0, 0, 0, 0).valueOf()
        }
        this.usersService.createUserOrPatient(user)
          .subscribe({
            'next': response => {
              if (response) {
                Swal.fire({
                  title: 'Advertencia!',
                  text: 'El paciente fue creado exitosamente',
                  icon: 'success',
                  confirmButtonText: 'Aceptar',
                  ...this.defaultOptionsAlerts.success
                }).then(() => this.router.navigate(['/', 'dashboard', 'pacientes']).then())

              } else {
                this.personAndUserForm.markAllAsTouched();
              }
            },
            'error': error => Swal.fire({
              title: 'Advertencia!',
              text: error.error.message,
              icon: 'warning',
              confirmButtonText: 'Aceptar',
              ...this.defaultOptionsAlerts.success
            }).then()
          })
      } else {
        this.personAndUserForm.markAllAsTouched();
      }
    }
  }

  setCode(event: any) {
    this.zipCode?.patchValue((event.target as HTMLSelectElement).value.split(':')[1]);
  }

}
