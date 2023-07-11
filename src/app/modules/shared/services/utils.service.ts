import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../environments/environment";
import {DocumentTypeItem} from "../models/document-type-item";
import {Country} from "../models/country";
import {Gender} from "../models/gender";
import {Role} from "../models/role";

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  apiUrl = environment.apiUrl+'/utils';
  constructor(private readonly http: HttpClient) { }

  getCountries(){
    return this.http.get< Country[]>(`${this.apiUrl}/countries`)
  }

  getGender() {
    return this.http.get< Gender[]>(`${this.apiUrl}/genders`)
  }
  getDocumentTypes() {
    return this.http.get< DocumentTypeItem[]>(`${this.apiUrl}/document-types`)
  }

  getRoles() {
    return this.http.get< Role[]>(`${this.apiUrl}/roles`)
  }
}
