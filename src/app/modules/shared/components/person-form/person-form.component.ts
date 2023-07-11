import {Component, OnInit} from '@angular/core';
import {DOCUMENT_TYPES} from "../../utils/utils";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {UsersService} from "../../services/users.service";
import {UtilsService} from "../../services/utils.service";

@Component({
  selector: 'app-person-form',
  templateUrl: './person-form.component.html',
  styleUrls: ['./person-form.component.scss']
})
export class PersonFormComponent implements OnInit {
  documentTypes = DOCUMENT_TYPES;
  personAndUserForm: FormGroup = new FormGroup({});

  countries: any[] = [];
  code!: any;

  constructor(
    private readonly fb: FormBuilder,
    private readonly usersService: UsersService,
    private readonly utilsService: UtilsService
  ) {
  }

  ngOnInit(): void {
    this.getCountries();
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
      role: new FormControl('', [Validators.required])
    })
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
          console.log(val)
          this.countries = val.sort(this.sortCountries)
        },
        'error': error => console.error(error),
      })
  }

  createUserOrPatient() {
    if (this.role?.valid) {
      this.usersService.createUserOrPatient(this.personAndUserForm.getRawValue())
        .subscribe(response => console.log)
    }
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

  setCode(event: any) {
    this.code = (event.target as HTMLSelectElement).value.split(':')[1];
  }

}
