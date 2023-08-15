import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {SignosVitalesInterface} from "../models/signos-vitales.interface";
import {environment} from "../../../../environments/environment";
import {checkToken} from "../interceptors/auth.interceptor";
import {NotaAclaratoriaInterface, NotaEnfermeriaInterface} from "../models/nota-enfermeria.interface";
import {OrdenMedicaInterface} from "../models/orden-medica.interface";
import {AtencionMedicaInterface} from "../models/atencion-medica.interface";

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
  registrarNotasEnfermeria(id: string, notaEnfermeria: NotaEnfermeriaInterface){
    return this.http.post<boolean>(`${this.apiUrl}/notas-enfermeria/${id}`, notaEnfermeria, {context: checkToken()});
  }


  obtenerNotasEnfermeria(id: string){
    console.log('service => id => ', id)
    return this.http.get<NotaEnfermeriaInterface[]>(`${this.apiUrl}/notas-enfermeria/${id}`, {context: checkToken()});
  }

  registrarNotasAclaratoria(path: string, idNota: string, notaEnfermeria: NotaAclaratoriaInterface){
    return this.http.post<boolean>(`${this.apiUrl}/${path}/${idNota}/notas-aclaratorias`, notaEnfermeria, {context: checkToken()});
  }

  crearOrdenMedica(id: string, ordenMedica: OrdenMedicaInterface) {
    return this.http.post(`${this.apiUrl}/ordenes-medicas/${id}`, ordenMedica)
  }

  crearAtencionMedica(atencionMedica: AtencionMedicaInterface) {
    return this.http.post<boolean>(`${this.apiUrl}/atenciones-medicas`, atencionMedica);
  }
}
