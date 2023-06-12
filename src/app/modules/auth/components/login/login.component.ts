import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup = new FormGroup({});

  constructor(private readonly fb: FormBuilder) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      identification: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      documentType: new FormControl('', [Validators.required]),
      remember: new FormControl(false, [Validators.required]),
    })
  }

  login() {
    if (this.loginForm.valid) {
      // Realizo la peticion
      console.log('Realizo la peticion');
    } else {
      console.log('Algo falta');

    }
    console.log(this.loginForm.value);
  }

}
