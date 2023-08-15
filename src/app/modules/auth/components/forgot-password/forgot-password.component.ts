import {Component, OnInit} from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import {OPTIONS_SWEET_ALERT} from "../../../shared/utils/utils";
import {AuthService} from "../../../shared/services/auth.service";
import {HttpErrorResponse} from "@angular/common/http";
import Swal from "sweetalert2";
import {UtilsService} from "../../../shared/services/utils.service";
import {DocumentTypeInterface} from "../../../shared/models/document-type.interface";

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  defaultOptionsAlerts = OPTIONS_SWEET_ALERT;
  forgotPasswordForm: FormGroup = new FormGroup({});
  documentTypes: DocumentTypeInterface[] = [];

  constructor(
    private readonly fb: FormBuilder,
    private readonly authService: AuthService,
    private readonly utilsService: UtilsService
  ) { }

  ngOnInit(): void {
    this.utilsService.getDocumentTypeList().subscribe({
      'next': documentType => this.documentTypes  = documentType,
      'error': error => console.error(error)
    })
    this.forgotPasswordForm = this.fb.group({
      identification: new FormControl('', [Validators.required]),
      documentType: new FormControl('', [Validators.required]),
    })
  }

  sendEmail() {
    if (this.forgotPasswordForm.valid) {
      // Realizo la peticion
      console.log();
      this.authService.forgotPassword(this.forgotPasswordForm.getRawValue())
        .subscribe({
          'next': response => {
            if (response) {
              // alert('Un email ha sido enviado a su correo electronico.');
              Swal.fire({
                title: 'Exito!',
                text: 'Hemos enviado un email para que restableszca su contraseña.',
                icon: 'success',
                confirmButtonText: 'Accept',
                ...this.defaultOptionsAlerts.success
              }).then(console.log)
            }
          },
          'error': (error: HttpErrorResponse) => {
            Swal.fire({
              title: 'Error!',
              text: error.error.message,
              icon: 'error',
              confirmButtonText: 'Accept',
              ...this.defaultOptionsAlerts.danger
            }).then(console.log)
          }
        });
    } else {
      console.log('Algo falta');

    }
    console.log(this.forgotPasswordForm.value);
  }
}
