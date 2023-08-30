import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-modal-usar-plantilla-nota',
  templateUrl: './modal-usar-plantilla-nota.component.html',
  styleUrls: ['./modal-usar-plantilla-nota.component.scss']
})
export class ModalUsarPlantillaNotaComponent implements OnInit{
  @Input() idNota :string = '';
  @Output() dataFormularioModal: EventEmitter<any> = new EventEmitter<any>();

  formularioModal!: FormGroup;
  constructor(private readonly fb: FormBuilder) {
  }
  ngOnInit(): void {
    this.formularioModal = this.fb.group({
      notaAclaratoria: new FormControl('', [])
    })
  }
  enviaFormularioModal() {
    this.dataFormularioModal.emit({...this.formularioModal.value, idNota: this.idNota  })
  }

}
