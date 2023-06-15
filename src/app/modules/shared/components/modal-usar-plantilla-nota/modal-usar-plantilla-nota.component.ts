import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-modal-usar-plantilla-nota',
  templateUrl: './modal-usar-plantilla-nota.component.html',
  styleUrls: ['./modal-usar-plantilla-nota.component.scss']
})
export class ModalUsarPlantillaNotaComponent implements OnInit{
  formularioModal!: FormGroup;
  constructor(private readonly fb: FormBuilder) {
  }
  ngOnInit(): void {
    this.formularioModal = this.fb.group({
      prop: new FormControl('', [])
    })
  }
  enviaFormularioModal() {
    console.log(this.formularioModal.value)
  }

}
