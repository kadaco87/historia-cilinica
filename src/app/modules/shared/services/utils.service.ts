import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../environments/environment";
import {DocumentTypeInterface} from "../models/document-type.interface";
import {CountryInterface} from "../models/country.interface";
import {GenderInterface} from "../models/gender.interface";
import {RoleInterface} from "../models/role.Interface";
import {RhInterface} from "../models/rh.interface";

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  apiUrl = environment.apiUrl+'/utils';
  constructor(private readonly http: HttpClient) { }

  getCountries(){
    return this.http.get< CountryInterface[]>(`${this.apiUrl}/countries`);
  }

  getGenders() {
    return this.http.get< GenderInterface[]>(`${this.apiUrl}/genders`);
  }
  getDocumentTypes() {
    return this.http.get< DocumentTypeInterface[]>(`${this.apiUrl}/document-types`);
  }

  getRoles() {
    return this.http.get< RoleInterface[]>(`${this.apiUrl}/roles`);
  }

  getRH() {
    return this.http.get< RhInterface[]>(`${this.apiUrl}/rh`);
  }
}
