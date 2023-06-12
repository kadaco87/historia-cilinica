import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-recovery-password',
  templateUrl: './recovery-password.component.html',
  styleUrls: ['./recovery-password.component.scss']
})
export class RecoveryPasswordComponent implements OnInit {
  recoveryPasswordForm: FormGroup = new FormGroup({});

  constructor(private readonly fb: FormBuilder) { }

  ngOnInit(): void {
    this.recoveryPasswordForm = this.fb.group({
      identification: new FormControl('', [Validators.required]),
      documentType: new FormControl('', [Validators.required]),
    })
  }

  recovery() {
    if (this.recoveryPasswordForm.valid) {
      // Realizo la peticion
      console.log('Realizo la peticion');
    } else {
      console.log('Algo falta');

    }
    console.log(this.recoveryPasswordForm.value);
  }
}
