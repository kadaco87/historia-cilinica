import {Component} from '@angular/core';

@Component({
  selector: 'app-medicamentos',
  templateUrl: './medicamentos.component.html',
  styleUrls: ['./medicamentos.component.scss']
})
export class MedicamentosComponent {
  displayedColumns: string[] = ['medicamento', 'presentacion', 'dosis', 'frecuencia', 'duracion','id'];
  dataSource = [{
    medicamentos: 'aaa',
    presentacion: 'aaa',
    dosis: 'aaa',
    frecuencia: 'aaa',
    duracion: 'aaa',
    id: 1
  }];
}
