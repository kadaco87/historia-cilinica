import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../../../shared/services/auth.service";
import Swal from "sweetalert2";
import {OPTIONS_SWEET_ALERT} from "../../../shared/utils/utils";

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  resetPasswordForm: FormGroup = new FormGroup({});
  defaultOptionsAlerts = OPTIONS_SWEET_ALERT;
  token= '';
  constructor(
    private readonly fb: FormBuilder,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly authService: AuthService
  ) {
    this.route.queryParams.subscribe(query=>{
      this.token = query['token'];
    })
  }

  ngOnInit(): void {

    this.resetPasswordForm = this.fb.group({
      password: new FormControl('', [Validators.required]),
      confirmPassword: new FormControl('', [Validators.required])
    })
  }

  resetPassword() {
    if(this.resetPasswordForm.valid){
      // TODO: Enviar nueva contraseña y token
      const body = {token: this.token, password: this.resetPasswordForm.getRawValue().password}
      this.authService.resetPassword(body).subscribe(response=> {
        if (response){
          Swal.fire({
            title: 'Exito!',
            text: 'Su contraseña a sido cambiada exitosamente.',
            icon: 'success',
            confirmButtonText: 'Aceptar',
            ...this.defaultOptionsAlerts.success
          }).then(()=>this.router.navigate(['/','auth','login']).then())

        }
      })
    }else{
      this.resetPasswordForm.markAllAsTouched();
    }
  }
}
