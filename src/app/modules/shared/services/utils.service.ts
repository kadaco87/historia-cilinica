import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../environments/environment";
import {DocumentTypeItem} from "../models/document-type-item";
import {Country} from "../models/country";
import {Gender} from "../models/gender";
import {Role} from "../models/role";
import {tap} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  apiUrl = environment.apiUrl+'/utils';
  constructor(private readonly http: HttpClient) { }

  getCountries(){
    return this.http.get< Country[]>(`${this.apiUrl}/countries`)
  }

  getGenders() {
    return this.http.get< Gender[]>(`${this.apiUrl}/genders`)
      .pipe(tap(gender => {
        return gender.map(g => {
          let genderObj = Object.assign(g);
          delete genderObj['_id'];
          delete genderObj['__v'];
          delete genderObj['deleted'];
          return genderObj;
        })

    }))
  }
  getDocumentTypes() {
    return this.http.get< DocumentTypeItem[]>(`${this.apiUrl}/document-types`)
  }

  getRoles() {
    return this.http.get< Role[]>(`${this.apiUrl}/roles`)
      .pipe(tap(roles => {
        return roles.map(r => {
          let roleObj = Object.assign(r);
          delete roleObj['_id'];
          delete roleObj['__v'];
          delete roleObj['deleted'];
          return roleObj;
        })

      }))
  }
}
