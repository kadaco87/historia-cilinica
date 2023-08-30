import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {OPTIONS_SWEET_ALERT} from "../../../shared/utils/utils";
import {AuthService} from "../../../shared/services/auth.service";
import Swal from "sweetalert2";
import {UtilsService} from "../../../shared/services/utils.service";
import {DocumentTypeInterface} from "../../../shared/models/document-type.interface";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup = new FormGroup({});
  documentTypes: DocumentTypeInterface[] = [];
  defaultOptionsAlerts = OPTIONS_SWEET_ALERT;

  constructor(
    private readonly fb: FormBuilder,
    private readonly router: Router,
    private readonly authService: AuthService,
    private readonly utilsService: UtilsService
  ) { }

  ngOnInit(): void {
    this.utilsService.getDocumentTypeList().subscribe({
      'next': documentTypes  => {
        this.documentTypes = documentTypes
      },
      'error': error => console.error(error)
    });
    this.loginForm = this.fb.group({
      identification: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      documentType: new FormControl(null, [Validators.required]),
    })
  }

  login() {
    if (this.loginForm.valid) {
      // Realizo la peticion
      this.authService.login(this.loginForm.getRawValue()).subscribe({
        'next': (response) => {
          if(response) {
            this.router.navigate(['/dashboard']).then();
          }
        }
        , 'error': error => Swal.fire({
          title: 'Advertencia!',
          text: error.error.message,
          icon: 'warning',
          confirmButtonText: 'Aceptar',
          ...this.defaultOptionsAlerts.success
        }).then()
      })
    } else {
      this.loginForm.markAllAsTouched();
    }
  }

}
