import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {DOCUMENT_TYPES, OPTIONS_SWEET_ALERT} from "../../../shared/utils/utils";
import {AuthService} from "../../../shared/services/auth.service";
import {CookieService} from "ngx-cookie-service";
import Swal from "sweetalert2";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup = new FormGroup({});
  documentTypes = DOCUMENT_TYPES;
  defaultOptionsAlerts = OPTIONS_SWEET_ALERT;

  constructor(
    private readonly fb: FormBuilder,
    private readonly router: Router,
    private readonly authService: AuthService,
    private readonly cookieService: CookieService
  ) {
  }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      identification: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      documentType: new FormControl(this.documentTypes[0], [Validators.required]),
    })
  }

  login() {
    if (this.loginForm.valid) {
      // Realizo la peticion
      this.authService.login(this.loginForm.getRawValue()).subscribe({
        'next': response => {
          console.log(response)
          console.log(response.access_token)
          this.cookieService.set('access_token', response.access_token);
          this.router.navigate(['/dashboard']).then()
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
      console.log('Algo falta en el formulario');

    }
  }

}
