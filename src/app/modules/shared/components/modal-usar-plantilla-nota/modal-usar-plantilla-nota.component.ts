import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-modal-usar-plantilla-nota',
  templateUrl: './modal-usar-plantilla-nota.component.html',
  styleUrls: ['./modal-usar-plantilla-nota.component.scss']
})
export class ModalUsarPlantillaNotaComponent implements OnInit{
  @Input() idNota = 0;
  @Output() dataFormularioModal: EventEmitter<any> = new EventEmitter<any>();

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
    const id = new Date(Date.now()).valueOf();
    this.dataFormularioModal.emit({...this.formularioModal.value, id, idNota: this.idNota  })
  }

}
