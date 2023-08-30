import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit  {

  id: number | null = null;
  constructor(private readonly route: ActivatedRoute) {

  }
  ngOnInit(): void { //  ejecutar al iniciar la vista
    this.route.params.subscribe(params => {
      this.id = params['id'] || null;
    })
  }


}
