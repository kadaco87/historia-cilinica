import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  apiUrl = environment.apiUrl+'/utils';
  constructor(private readonly http: HttpClient) { }

  getCountries(){
    return this.http.get< any[]>(`${this.apiUrl}/countries`)
  }
}
