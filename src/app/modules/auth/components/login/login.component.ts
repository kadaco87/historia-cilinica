import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup = new FormGroup({});
  documentTypes = [
    {documentType: 1, value: 'Cedula de ciudadania'},
    {documentType: 2, value: 'Cedula de Extranjeria'},
    {documentType: 3, value: 'Pasaporte'},
    {documentType: 4, value: 'Tarjeta de Identidad'}
  ]

  constructor(private readonly fb: FormBuilder,
    private readonly router: Router) { }

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
      console.log('Realizo la peticion');
    } else {
      console.log('Algo falta');

    } this.router.navigate(["/dashboard"]).then() //promesa que provee angula para navegar por todo el aplicativo
    console.log(this.loginForm.value);
  }

}
