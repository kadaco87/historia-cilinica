import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { distanceAndSkiddingToXY } from '@popperjs/core/lib/modifiers/offset';

@Component({
  selector: 'app-formulario-paciente',
  templateUrl: './formulario-paciente.component.html',
  styleUrls: ['./formulario-paciente.component.scss']
})


export class FormularioPacienteComponent implements OnInit {

  id: number | null = null;
  constructor(private readonly route: ActivatedRoute) {

  }
  ngOnInit(): void { //  ejecutar al iniciar la vista
    this.route.params.subscribe(params => {
      this.id = params['id'] || null;
      console.log(this.id);

    })
  }

}
