import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {SignosVitalesInterface} from "../models/signos-vitales.interface";
import {environment} from "../../../../environments/environment";
import {checkToken} from "../interceptors/auth.interceptor";

@Injectable({
  providedIn: 'root'
})
export class HistoriaClinicaService {

  apiUrl = environment.apiUrl+'/clinic-history';
  constructor(private readonly http: HttpClient) { }

  registrarSignosVitales(id: string, signosVitales: SignosVitalesInterface){
    return this.http.post<boolean>(`${this.apiUrl}/vital-signs/${id}`, signosVitales, {context: checkToken()});
  }

  obtenerSignosVitales(id: string){
    return this.http.get<SignosVitalesInterface[]>(`${this.apiUrl}/vital-signs/${id}`, {context: checkToken()});
  }
}
