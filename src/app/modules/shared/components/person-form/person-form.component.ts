import {Component, OnInit} from '@angular/core';
import {DOCUMENT_TYPES} from "../../utils/utils";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {UsersService} from "../../services/users.service";

@Component({
  selector: 'app-person-form',
  templateUrl: './person-form.component.html',
  styleUrls: ['./person-form.component.scss']
})
export class PersonFormComponent implements OnInit {
  documentTypes = DOCUMENT_TYPES;
  personAndUserForm: FormGroup = new FormGroup({});

  constructor(
    private readonly fb: FormBuilder,
    private readonly usersService: UsersService
  ) {  }

  ngOnInit(): void {
    this.intForm();
  }

  intForm(){
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
  get role(){
    return this.personAndUserForm.get('role');
  }

  createUserOrPatient() {
    console.log(this.role?.valid)
    if(this.role?.valid) {
      // console.log(this.personAndUserForm.getRawValue());
      this.usersService.createUserOrPatient(this.personAndUserForm.getRawValue())
        .subscribe(response => console.log)
    }
  }
}
